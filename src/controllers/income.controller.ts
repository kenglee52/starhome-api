import { Request, Response } from "express";
import { Income } from "../models/income.model";

export const getAllIncome = async(req: Request, res: Response)=>{
  try {
    const results = await Income.findAll();  
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server Error"});
  }
};

export const getSumIncome = async(req: Request, res: Response)=>{
  try {
    const result = await Income.sum("incomeAmount");
    res.status(200).json(result);
  } catch (error) {
   console.error(error);
    res.status(500).send({message: "Server Error"});
  }
};

export const createIncome = async(req: Request, res: Response)=>{
  try {
    await Income.create(req.body);
    res.status(200).json({message: "ບັນທຶກສຳເລັດ"});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server Error"});
  }
} 


export const deleteIncome = async(req: Request, res:Response)=>{
  try {
    await Income.destroy({
      where: {incomeID: req.params.incomeID}
    });
    res.status(200).send({message: "Delete succes"});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server error"});
  }
};

export const updateIncome = async(req: Request, res: Response)=>{
  try {
    await Income.update(req.body,{
      where:{
        incomeID: req.params.incomeID
      }
    });
    res.status(200).json({message: 'Success'})
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Server error", error})
  }
}