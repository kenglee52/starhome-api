import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Employee } from "../models/employee.model";
import bcrypt from "bcrypt";
import { Role } from "../models/role.model";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const results = await User.findAll({
      include: [
        {
          model: Employee
        }, {
          model: Role
        }
      ]
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(200).send({ message: 'Server error' })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { roleID, employeeID, password } = req.body;

    if (!password || !roleID || !employeeID) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(200).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const {roleID} = req.body;
  try {
    const result = await User.update({roleID}, { where: { userID: req.params.userID } });
    res.status(200).json({ message: 'Success', result: result});
  } catch (error) {
    console.error(error);
    res.status(200).send({ message: 'Server error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.destroy({ where: { userID: req.params.userID } });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(200).send({ message: 'Server error' })
  }
}
export const Login = async (req: Request, res: Response) => {
  try {
    const { tel, password } = req.body;

    // 1. ຄົ້ນ user ຜ່ານ employeeTel
    const user = await User.findOne({
      include: [
        {
          model: Employee,
          where: { employeeTel: tel }, // tel ຢູ່ employee
        },
      ],
      order: [['createdAt', 'DESC']], // always get the latest user
    });

    console.log('Login debug:', { tel, password, user }); // <-- log user object

    if (!user) {
      return res.status(401).json({ message: "Invalid tel or password" });
    }

    // 2. ກວດ password ຢູ່ user
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password compare:', { input: password, hash: user.password, isMatch }); // <-- log compare result
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid tel or password" });
    }

    // 3. ສົ່ງຂໍ້ມູນກັບບໍ່ສົ່ງ password
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return res.json({
      message: "Login success",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


