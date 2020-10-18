const express = require("express");
const ArticleController = require("../controllers/article");
const router = express.Router()

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
router.post("/", addNewArticle)
	
// Get single article
router.get("/:id", getSingleArticle)

// Update article
router.patch("/:id", updateArticle)

// Delete article
router.delete("/:id", deleteArticle)

module.exports = router
