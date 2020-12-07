import express from "express";
import { verifyToken } from "../middleware/auth";


import{
    getAllContact,
    addNewContact, getSingleContact,deleteContact
} from "../controllers/contact"
const router = express.Router()

// Get all contact
router.get("/", getAllContact)

// Add new contact
router.post("/", addNewContact)

// Get single contact
router.get("/:id", getSingleContact)

// Delete contact
router.delete("/:id", verifyToken, deleteContact)

export default router
