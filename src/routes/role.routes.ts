import { Router } from "express";
import { getRole } from "../controllers/role.controller";

const router = Router();
router.get('/', getRole);

export default router;