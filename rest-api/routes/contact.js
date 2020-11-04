const express = require("express");
const contactController = require("../controllers/contact");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");
const multerConfig = require("../middleware/multerConfig");


const {
    getAllContact,
    addNewContact
} = contactController
const router = express.Router()

// Get all contact
router.get("/", getAllContact)

// Add new contact
router.post("/", addNewContact)

module.exports =router
