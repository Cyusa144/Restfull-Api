const express = require("express");
const ArticleController = require("../controllers/article");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const upload = require("../middleware/upload");
const multerConfig = require("../middleware/multerConfig");



const {
	getAllArticles,
	addNewArticle,
	getSingleArticle,
	updateArticle,
	deleteArticle
} = ArticleController;

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

module.exports = router
