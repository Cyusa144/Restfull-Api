import { json } from "body-parser";
import contactModel from "../models/contact";
import {
	validator,
	validationErrors
} from "../validation";


const getAllContact = async (req, res) => {
    try {
        const contact = await contactModel.find()
        res.status(200).send({contact})
    } catch (error) {
		res.status(500).json({ error })
	// }
	// 	res.send({ error })
	}
};

const addNewContact = async (req, res) => {
    try {
        // const { error } = validator('contact', req.body);
        // if (error) {
        //     return validationErrors(res, error);
        // }
        const contact = new contactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })
        await contact.save()
        res.status(201).send({
            message: "successfully created contact", 
            data: contact 
        })
    } catch (error) {
		res.status(500).json({ error })
	}
};
const getSingleContact = async(req, res) => {
	try {
        const contact = await contactModel.findOne({ _id: req.params.id })
        if(!contact) return res.status(404).json({status: 404,message: 'invalid contact id'})
		return res.status(200).send({message: "successfully fetched contact", contact})
	} catch(error) {
        console.log(error.message)
		// res.status(404)
		// res.send({ error: "invalid contact id" })
	}
};

const deleteContact = async (req, res) => {
	try {
		await contactModel.deleteOne({ _id: req.params.id })
		res.send({ success: "contact successfully deleted" }).status(204)
	} catch(error) {
		res.status(404).json({ error: "invalid contact id" })
	} 
};

export {
    getAllContact,
    addNewContact,
    getSingleContact,
    deleteContact
}
