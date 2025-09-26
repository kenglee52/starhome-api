import { Router } from "express";
import { getOwner, createOwner, updateOwner, deleteOwner, getOwnerId , getOwnerCount, searchOwner} from "../controllers/owner.controller";


const router = Router();
router.get('/', getOwner);
router.post('/', createOwner);
router.put('/:ownerID', updateOwner);
router.delete('/:ownerID', deleteOwner);
router.get('/ownerID', getOwnerId);
router.get("/owner-count", getOwnerCount);
router.get("/search", searchOwner)
export default router; 