import express from "express";


import{
    getAllContact,
    addNewContact
} from "../controllers/contact"
const router = express.Router()

// Get all contact
router.get("/", getAllContact)

// Add new contact
router.post("/", addNewContact)

export default router
