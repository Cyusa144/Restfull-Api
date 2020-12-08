import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

import{
	getAllUser,
	addNewUser,
	loginUser
} from "../controllers/user"


// Gets all users
router.get("/", getAllUser)

// Add new user
router.post("/create", addNewUser)
	
// Login user
router.post("/login", loginUser)
// /api/user/login


export default router
