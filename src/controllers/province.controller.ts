import { Request, Response } from "express";
import { Province } from "../models/province.model";
import { District } from "../models/district.model";
export const getProvinces = async (req: Request, res: Response) => {
    try {
        const provinces = await Province.findAll();
        res.status(200).json(provinces);
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDistrictByProvince =async(req: Request, res: Response)=>{
    try {
        const results = await Province.findAll({
            include: District,
            where:{provinceID : req.params.provinceID}
        });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}