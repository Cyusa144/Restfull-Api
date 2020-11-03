const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

const {
	addNewUser,
	loginUser
} = UserController;

// Add new user
router.post("/create/", addNewUser)
	
// Login user
router.post("/login/", loginUser)


module.exports = router
