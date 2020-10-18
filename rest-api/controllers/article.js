const articleModel = require("../models/article");

const getAllArticles = async (req, res) => {
    const articles = await articleModel.find()
    res.status(200).send({articles})
};

const addNewArticle = async (req, res) => {
    const article = new articleModel({
        title: req.body.title,
        content: req.body.content,
    })
    await article.save()
    res.status(201).send({article})
};

const getSingleArticle = async (req, res) => {
	const article = await articleModel.findOne({ _id: req.params.id })
	res.status(200).send(article)
};

const updateArticle = async (req, res) => {
    const post = await articleModel.findOne({ _id: req.params.id })

    if (req.body.title) {
        post.title = req.body.title
    }

    if (req.body.content) {
        post.content = req.body.content
    }

    await post.save()
    res.status(200).send(post)
};

const deleteArticle = async (req, res) => {
    await articleModel.deleteOne({ _id: req.params.id })
    res.status(204)
    res.send({ success: "Article deleted" })
};

module.exports = {
    getAllArticles,
    addNewArticle,
    getSingleArticle,
    updateArticle,
    deleteArticle
}