import { Router } from "express";
import { getProvinces, getDistrictByProvince } from "../controllers/province.controller";

const router = Router();

router.get("/", getProvinces);
router.get("/districts/:provinceID", getDistrictByProvince);
export default router;