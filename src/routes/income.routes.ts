import { Router } from "express";
import { getAllIncome, createIncome, deleteIncome, getSumIncome, updateIncome } from "../controllers/income.controller";

const router = Router();
router.get("/", getAllIncome);
router.get("/sum-income", getSumIncome);
router.post("/", createIncome);
router.put("/:incomeID", updateIncome);
router.delete("/:incomeID", deleteIncome);

export default router;  