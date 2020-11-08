import articleModel from "../models/article";
import express from "express";
import cloud from "../middleware/cloudinaryConfig";
import fs from "fs";

import {
	validator,
	validationErrors
} from "../validation";




const getAllArticles = async (req, res) => {
    try {
		const articles = await articleModel.find()
		res.status(200).send({articles})
	} catch (error) {
		res.status(500)
		res.send({ error })
	}
};

const addNewArticle = async (req, res) => {
	try {
		const result = await cloud.uploads(req.files[0].path);
		const article = new articleModel({
			title: req.body.title,
			content: req.body.content,
			image: result.url
		})
		await article.save()
		res.status(201).send({message: "successfully created article", article})
	}
	catch (error) {
		res.status(500)
		console.log( error )
		// res.send({ error })
	}
};

const getSingleArticle = async(req, res) => {
	try {
		const article = await articleModel.findOne({ _id: req.params.id })
		res.status(200).send({message: "successfully fetched article", article})
	} catch(error) {
		res.status(404)
		res.send({ error: "Article doesn't exist!" })
	}
};

const updateArticle = async (req, res) => {
	try {
		
		const post = await articleModel.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.status(200).send({message: "successfully updated article", post})
	} catch(error) {
		res.status(404).send({ error: "Article doesn't exist!" })
	}
};

const deleteArticle = async (req, res) => {
	try {
		await articleModel.deleteOne({ _id: req.params.id })
		res.send({ success: "Article successfully deleted" }).status(204)
	} catch(error) {
		res.send({ error: "Article doesn't exist!" }).status(404)
	} 
};

export {
    getAllArticles,
    addNewArticle,
    getSingleArticle,
    updateArticle,
    deleteArticle
}
