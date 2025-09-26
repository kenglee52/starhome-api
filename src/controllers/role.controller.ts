import { Request, Response } from "express";
import { Role } from "../models/role.model";

export const getRole =async(req:Request, res:Response)=>{
   try {
      const roles = await Role.findAll();
      res.status(200).json(roles);
   } catch (error) {
     console.error(error);
     res.status(200).send({message: 'Server error'})
   }
}