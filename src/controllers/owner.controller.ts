import { Request, Response } from "express";
import { Owner } from "../models/owner.model";
import { Op } from "sequelize";
export const getOwner = async (req: Request, res: Response) => {
   try {
      const owners = await Owner.findAll();
      res.status(200).json(owners);
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
   }
}

export const createOwner = async (req: Request, res: Response) => {
   const { ownerName, ownerGender, ownerTel } = req.body;
   try {
      const existingOwner = await Owner.findOne({
         where: { ownerTel }
      });
      if (existingOwner) {
         return res.status(400).send({ message: 'Tel already exists' });
      }
      await Owner.create({ ownerName, ownerGender, ownerTel });
      res.status(200).send({ message: 'Save data success' })
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
   }
}

export const updateOwner = async (req: Request, res: Response) => {
   try {
      await Owner.update(
         req.body,
         {
            where: { ownerID: req.params.ownerID }
         }
      );
      res.status(200).send({ message: "Update success" });
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
   }
};

export const deleteOwner = async (req: Request, res: Response) => {
   try {
      await Owner.destroy({
         where: { ownerID: req.params.ownerID }
      });
      res.status(200).send({ message: 'Delete success' });
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
   }
}

export const getOwnerId = async (req: Request, res: Response) => {
   try {
      const result = await Owner.findOne({
         order: [['ownerID', 'DESC']],
      });
      res.status(200).json(result ? result.ownerID : 0); // ถ้าไม่มีข้อมูลส่ง 0
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
   }
};
export const getOwnerCount = async (req: Request, res: Response) => {
   try {
      const result = await Owner.findAndCountAll();
      res.status(200).json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
   }
}

export const searchOwner = async (req: Request, res: Response) => {
   const search = req.query.search;
   try {
      const result = await Owner.findAll({
         where: {
            [Op.or]: [
               { ownerName: { [Op.like]: `%${search}%` } },
               { ownerGender: { [Op.like]: `%${search}%` } },
               { ownerTel: { [Op.like]: `%${search}%` } },
            ]
         }
      })
      res.status(200).json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
   }
}

