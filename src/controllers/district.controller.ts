import { Request, Response } from "express";
import { District } from "../models/district.model";
import { Province } from "../models/province.model";
export const getDistricts = async (req: Request, res: Response) => {
    try {
         const districts = await District.findAll();
         res.status(200).json(districts)
    } catch (error) {
         console.error('Error fetching districts:', error);
         res.status(500).json({ message: 'Internal server error' });
         
    }
}

export const getProvinceByDistrict = async(req: Request, res: Response)=>{
  try {
     const results = await District.findAll({
        include: Province,
        where: {districtID: req.params.districtID}
     })
     res.status(200).json(results);
  } catch (error) {
     console.error('Error fetching districts:', error);
     res.status(500).json({ message: 'Internal server error' });
  }
}