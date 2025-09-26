import { Router } from "express";
import upload from '../middleware/uploads';
import { getTypeCount, getProductCount, getProducts, createProduct, updateProduct, deleteProduct, searchAllProducts, searchProducts, getProductAutoId, removeProductImageByIndex, removeProductMediaByIndex, addImageToProduct, addVideoToProduct } from "../controllers/product.controller";
const router = Router();
router.post('/:productID/add-image', upload.fields([{ name: 'image', maxCount: 1 }]), addImageToProduct);
router.post('/:productID/add-video', upload.fields([{ name: 'video', maxCount: 1 }]), addVideoToProduct);
router.delete("/remove-image", removeProductImageByIndex);
router.delete("/remove-video", removeProductMediaByIndex);
router.get("/autoid", getProductAutoId);
router.get("/", getProducts);
router.get("/search", searchAllProducts);
router.post("/search", searchProducts);
router.get("/product-count", getProductCount)
router.get("/type-count", getTypeCount)
router.post(
  '/upload',
  upload.fields([
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 3 }
  ]),
  createProduct
);
router.put(
  '/upload/:productID',
  upload.fields([ 
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 3 }
  ]),
  updateProduct
);
router.delete("/:productID", deleteProduct);
export default router;