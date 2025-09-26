import { Router } from "express";
import { getDistricts , getProvinceByDistrict} from "../controllers/district.controller";
const router = Router();
router.get('/',getDistricts);
router.get("/province/:districtID", getDistricts);
export default router;