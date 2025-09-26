import { Request, Response } from "express";
import { Expense } from "../models/expense.model";

export const getAllExpense = async(req: Request, res: Response)=>{
  try {
    const results = await Expense.findAll();  
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server Error"});
  }
};

export const getSumExpense = async(req: Request, res: Response)=>{
  try {
    const result = await Expense.sum("expenseAmount");
    res.status(200).json(result);
  } catch (error) {
   console.error(error);
    res.status(500).send({message: "Server Error"});
  }
};

export const createExpense = async(req: Request, res: Response)=>{
  try {
    await Expense.create(req.body);
    res.status(200).send({message: "ບັນທຶກສຳເລັດ"});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server Error"});
  }
}

export const deleteExpense = async(req: Request, res:Response)=>{
  try {
    await Expense.destroy({
      where: {expenseID: req.params.expenseID}
    });
    res.status(200).send({message: "Delete succes"});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server error"});
  }
};

export const updateExpense = async(req: Request, res: Response)=>{
  try {
    await Expense.update(req.body,{
      where:{
        expenseID: req.params.expenseID
      }
    });
    res.status(200).json({message: 'Success'})
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server error", error})
  }
}