import { Request, Response } from "express";
import { Employee } from "../models/employee.model";
import { District } from "../models/district.model";
import { Province } from "../models/province.model";
import { Position } from "../models/position.model";
import { User } from "../models/user.model";
export const getEmployee = async (req: Request, res: Response) => {
  try {
    const results = await Employee.findAll({
      include: [{
        model: District,
        include: [{
          model: Province
        }]
      },
    {
      model: Position
    },
    {
      model: User
    } 
  
  ]
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      employeeName,
      birth,
      employeeTel,
      employeeVillage,
      districtID,
      salary,
      positionID,
      employeeGender,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const imagePath = file.path;

    await Employee.create({
      employeeName,
      birth,
      employeeTel,
      employeeVillage,
      cv: imagePath,
      districtID,
      salary,
      positionID,
      employeeGender,
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const {
      employeeName,
      birth,
      employeeTel,
      employeeVillage,
      districtID,
      salary,
      positionID,
      employeeGender,
    } = req.body;
    await Employee.update({
      employeeName,
      birth,
      employeeTel,
      employeeVillage,
      districtID,
      salary,
      positionID,
      employeeGender,
    }, {
         where:{employeeID: req.params.employeeID}
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
export const deleteEmployee = async(req: Request, res: Response)=>{
  try {
      await Employee.destroy({
         where:{employeeID: req.params.employeeID}
      });
      res.status(200).send({ message: "Success" });
  } catch (error) {
      console.error(error);
    res.status(500).send({ message: "Server error" });   
  }
}
