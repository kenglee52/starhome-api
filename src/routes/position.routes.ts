import { Router } from "express";
import { getPositions } from "../controllers/position.controller";

const router = Router();
router.get('/', getPositions);

export default router;