import { Router } from "express";
import { getEmployee, createEmployee , updateEmployee, deleteEmployee} from "../controllers/employee.controller";
import upload from "../middleware/uploads";

const router = Router();

router.get("/", getEmployee);
router.post("/upload", upload.single("image"), createEmployee);
router.put("/:employeeID", updateEmployee);
router.delete("/:employeeID", deleteEmployee);
export default router;
