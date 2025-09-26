import { ProductType } from "../models/product_type.model";
import { Request, Response } from "express";

export const getProductTypes = async (req: Request, res: Response) => {
  try {
    const results = await ProductType.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(200).send({ message: 'Server error' })
  }
}
export const createProductType = async (req: Request, res: Response) => {
  const {productTypeName } = req.body;
  try {
    const existingProductType = await ProductType.findOne({
      where: { productTypeName }
    });
    if (existingProductType) {
      return res.status(400).send({ message: 'ProductTypeName already exists' });
    }
    await ProductType.create(req.body);
    res.status(200).json({ message: 'Succcess' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

export const updateProductType = async (req: Request, res: Response) => {
  const {productTypeName } = req.body;
  try {
    const existingProductType = await ProductType.findOne({
      where: { productTypeName }
    });
    if (existingProductType) {
      return res.status(400).send({ message: 'ProductTypeName already exists' });
    }
    await ProductType.update(req.body, {
      where: { productTypeID: req.params.productTypeID }
    });
    res.status(200).json({ message: 'Succcess' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}
export const deleteProductType = async (req: Request, res: Response) => {
  try {
    await ProductType.destroy({
      where: { productTypeID: req.params.productTypeID }
    });
    res.status(200).json({ message: 'Succcess' });
  } catch (error) {
    console.error(error);
    res.status(200).send({ message: 'Server error' });
  }
}
