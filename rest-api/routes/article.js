import express from "express";
import ArticleController from "../controllers/article";
import { verifyToken } from "../middleware/auth";
const router = express.Router();
import upload from "../middleware/upload";
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
