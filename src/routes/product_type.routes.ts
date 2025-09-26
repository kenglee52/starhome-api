import { Router } from "express";
import { getProductTypes, createProductType, updateProductType, deleteProductType } from "../controllers/product_type.controller";
const router = Router();
router.get("/", getProductTypes);
router.post("/", createProductType);
router.put("/:productTypeID", updateProductType);
router.delete("/:productTypeID", deleteProductType);
export default router;