import express from "express";
import { verifyToken } from "../middleware/auth";
const router = express.Router();
import multerConfig from "../middleware/multerConfig";



import {
	getAllArticles,
	addNewArticle,
	getSingleArticle,
	updateArticle,
	deleteArticle
} from "../controllers/article";

// Get all articles
router.get("/", getAllArticles)

// Add new article
router.post("/", verifyToken, multerConfig, addNewArticle)
	
// Get single article
router.get("/:id", getSingleArticle)

// Update article
router.patch("/:id", verifyToken, updateArticle)

// Delete article
router.delete("/:id", verifyToken, deleteArticle)

export default router
