import { Router } from "express";
import { getAllExpense, createExpense, deleteExpense, getSumExpense, updateExpense } from "../controllers/expense.controller";

const router = Router();
router.get("/", getAllExpense);
router.get("/sum-expense", getSumExpense);
router.post("/", createExpense);
router.put("/:expenseID", updateExpense);
router.delete("/:expenseID", deleteExpense);

export default router;