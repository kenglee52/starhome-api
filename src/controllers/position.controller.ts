import { Request, Response } from "express";
import { Position } from "../models/position.model";

export const getPositions = async(req:Request, res:Response)=>{
   try {
         const results = await Position.findAll();
         res.status(200).json(results);
   } catch (error) {
         console.error(error);
         res.status(500).send({message: 'Server error'});
   }
}