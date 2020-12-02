import express from "express";
import UserController from "../controllers/user";
import loginvalidation from "../validation/loginvalidation"
const router = express.Router();

import{
	addNewUser,
	loginUser
} from "../controllers/user"

// Add new user
router.post("/create/", addNewUser)
	
// Login user
router.post("/login/", loginUser)
// /api/user/login


export default router
