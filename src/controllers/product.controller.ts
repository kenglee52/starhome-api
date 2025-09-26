import { Request, Response } from "express";
import { Op } from "sequelize";
import { Product } from "../models/product.model";
import { District } from "../models/district.model";
import { Province } from "../models/province.model";
import { ProductType } from "../models/product_type.model";
import { Owner } from "../models/owner.model";
import { Currency } from "../models/currency.model";
import fs from "fs";

export const getProductAutoId = async (req: Request, res: Response) => {
  try {
    // ດຶງ productID ທີ່ສູງສຸດ
    const lastProduct = await Product.findOne({
      order: [['productID', 'DESC']],
    });

    let newId: string;

    if (!lastProduct) {
      // ຖ້າບໍ່ມີຂໍ້ມູນໃນຖານ
      newId = 'HXV0001';
    } else {
      // ດຶງເອົາສ່ວນຕົວເລກຈາກ productID ເກົ່າ
      const lastId = lastProduct.productID; // eg. HXV0007
      const lastNumber = parseInt(lastId.replace('HXV', ''), 10); // -> 7

      // ບວກເພີ່ມ 1
      const nextNumber = lastNumber + 1;

      // ສ້າງເປັນຮູບແບບ HXV000X
      newId = `HXV${nextNumber.toString().padStart(4, '0')}`;
    }

    res.status(200).json({ newId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

export const searchAllProducts = async (req: Request, res: Response) => {
  const search = req.query.search || '';
  try {
    const results = await Product.findAll({
      include: [
        {
          model: District,
          required: false,
          include: [
            {
              model: Province,
              required: false
            }
          ]
        }
      ],
      where: {
        [Op.or]: [
          { productID: { [Op.like]: `%${search}%` } },
          { productName: { [Op.like]: `%${search}%` } },
          { village: { [Op.like]: `%${search}%` } },
          { '$District.districtName$': { [Op.like]: `%${search}%` } },
          { '$District.Province.provinceName$': { [Op.like]: `%${search}%` } }
        ]
      },
      order: [['productID', 'DESC']]
    });

    res.status(200).json(results.map(p => parseProductMedia(p.toJSON())));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { provinceID, districtID, productTypeID, priceMax, status } = req.query;

    let productWhere: any = {};
    if (productTypeID) productWhere.productTypeID = productTypeID;
    if (status) productWhere.status = status;
    if (priceMax) {
      productWhere.price = { [Op.lte]: Number(priceMax) };
    }

    // ໃຊ້ provinceID ເພື່ອ filter ສະເພາະ province ທີ່ຕ້ອງການ
    const products = await Product.findAll({
      where: productWhere,
      include: [
        {
          model: District,
          include: [
            {
              model: Province,
              where: provinceID ? { provinceID } : undefined // ຖ້າ provinceID ມີ, ຈະ filter ສະເພາະ province ນັ້ນ
            }
          ],
          where: districtID ? { districtID } : undefined
        },
        {
          model: ProductType
        }
      ]
    });

    res.status(200).json(products.map(p => parseProductMedia(p.toJSON())));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: District,
        include: [Province]
      },
      {
        model: Owner
      },
      {
        model: Currency
      }
      ],

      order: [['productID', 'DESC']]
    });
    const parsed = products.map(p => parseProductMedia(p.toJSON()));
    res.status(200).json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productID,
      productName,
      ownerID,
      productTypeID,
      village,
      districtID,
      status,
      size,
      price,
      tel,
      description,
      currencyID,
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || !files.image || !files.video) {
      return res.status(400).json({ error: 'Image and video files are required.' });
    }

    const imagePaths = files.image.map(f => f.path);
    const videoPaths = files.video.map(f => f.path);

    const newProduct = await Product.create({
      productID,
      productName,
      ownerID,
      productTypeID,
      village,
      districtID,
      status,
      size,
      price,
      image: JSON.stringify(imagePaths),
      video: JSON.stringify(videoPaths),
      tel,
      description,
      currencyID
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      ownerID,
      productTypeID,
      village,
      districtID,
      status,
      size,
      price,
      tel,
      description,
      currencyID
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // ຊອກຫາ product ເກົ່າ
    const product = await Product.findByPk(req.params.productID);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ຖ້າມີຮູບໃໝ່ → ໃຊ້ໃໝ່, ບໍ່ງັ້ນໃຊ້ເກົ່າ
    const imagePath =
      files && files.image && files.image.length > 0
        ? files.image[0].path
        : product.image;

    // ຖ້າມີວີດີໂອໃໝ່ → ໃຊ້ໃໝ່, ບໍ່ງັ້ນໃຊ້ເກົ່າ
    const videoPath =
      files && files.video && files.video.length > 0
        ? files.video[0].path
        : product.video;

    // ອັບເດດ
    await product.update({
      productName,
      ownerID,
      productTypeID,
      village,
      districtID,
      status,
      size,
      price,
      tel,
      description,
      currencyID,
      image: imagePath,
      video: videoPath,
    });

    res.status(200).json({ message: "Update success", product });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update product", details: err instanceof Error ? err.message : err });
  }
};



export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.destroy({
      where: { productID: req.params.productID }
    });
    res.status(200).send({ message: 'Delete success' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

export const removeProductImageByIndex = async (req: Request, res: Response) => {
  try {
    const { productID, imageIndex } = req.body; // รับ productID + index ที่ต้องการลบ

    const product = await Product.findByPk(productID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // แปลง image เป็น array
    let images: string[] = [];
    if (typeof product.image === 'string') {
      images = JSON.parse(product.image || '[]');
    } else if (Array.isArray(product.image)) {
      images = product.image;
    }

    if (imageIndex < 0 || imageIndex >= images.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    // ลบไฟล์ออกจาก server (optional)
    const removedImage = images[imageIndex];
    if (fs.existsSync(removedImage)) {
      fs.unlinkSync(removedImage);
    }

    // ลบจาก array
    images.splice(imageIndex, 1);

    // อัปเดต database
    await product.update({ image: JSON.stringify(images) });

    res.status(200).json({ message: "Image removed successfully", images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const removeProductMediaByIndex = async (req: Request, res: Response) => {
  try {
    const { productID, mediaType, index } = req.body;
    // mediaType = "image" หรือ "video"

    const product = await Product.findByPk(productID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // แปลงเป็น array
    let mediaArray: string[] = [];
    if (mediaType === "image") {
      if (typeof product.image === "string") mediaArray = JSON.parse(product.image || "[]");
      else if (Array.isArray(product.image)) mediaArray = product.image;
    } else if (mediaType === "video") {
      if (typeof product.video === "string") mediaArray = JSON.parse(product.video || "[]");
      else if (Array.isArray(product.video)) mediaArray = product.video;
    } else {
      return res.status(400).json({ message: "Invalid mediaType, must be 'image' or 'video'" });
    }

    if (index < 0 || index >= mediaArray.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // ลบไฟล์ออกจาก server (optional)
    const removedFile = mediaArray[index];
    if (fs.existsSync(removedFile)) fs.unlinkSync(removedFile);

    // ลบออกจาก array
    mediaArray.splice(index, 1);

    // อัปเดต database
    if (mediaType === "image") {
      await product.update({ image: JSON.stringify(mediaArray) });
    } else {
      await product.update({ video: JSON.stringify(mediaArray) });
    }

    res.status(200).json({ message: `${mediaType} removed successfully`, media: mediaArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// ຊ່ວຍ parse JSON array ຫຼື string
function parseMaybeArray(val: string | string[]): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed;
    return [val];
  } catch {
    return [val];
  }
}

// ແປຮູບ product
function parseProductMedia(product: any) {
  return {
    ...product,
    image: parseMaybeArray(product.image),
    video: parseMaybeArray(product.video),
  };
}

export const addImageToProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || !files.image || files.image.length === 0) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const product = await Product.findByPk(productID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let images: string[] = [];
    if (typeof product.image === "string") images = JSON.parse(product.image || "[]");
    else if (Array.isArray(product.image)) images = product.image;

    // เพิ่มรูปใหม่
    images.push(files.image[0].path);

    await product.update({ image: JSON.stringify(images) });

    res.status(200).json({
      message: "Image added successfully",
      images
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};


export const addVideoToProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || !files.video || files.video.length === 0) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const product = await Product.findByPk(productID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let videos: string[] = [];
    if (typeof product.video === "string") videos = JSON.parse(product.video || "[]");
    else if (Array.isArray(product.video)) videos = product.video;

    // เพิ่มวิดีโอใหม่
    videos.push(files.video[0].path);

    await product.update({ video: JSON.stringify(videos) });

    res.status(200).json({
      message: "Video added successfully",
      videos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductCount = async (req: Request, res: Response) => {
  try {
    const result = await Product.findAndCountAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

import { fn, col } from "sequelize";

export const getTypeCount = async (req: Request, res: Response) => {
  try {
    const results = await Product.findAll({
      attributes: [
        'productTypeID',  // ຊື່ foreign key ທີ່ອ່ານ ProductType
        [fn('COUNT', col('product.productID')), 'count']
      ],
      group: ['ProductTypeId'],
      include: [{ model: ProductType, attributes: ['productTypeName'] }]
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
