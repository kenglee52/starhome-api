import { Router } from "express";
import { getUsers, updateUser, createUser, deleteUser, Login } from "../controllers/user.controller";

const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userID', updateUser);
router.delete('/:userID',deleteUser);
router.post("/login", Login)

export default router;