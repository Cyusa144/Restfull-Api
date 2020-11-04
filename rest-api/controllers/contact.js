const contactModel = require("../models/contact");


const getAllContact = async (req, res) => {
    try {
        const contact = await contactModel.find()
        res.status(200).send(contact)
    } catch (error) {
		res.status(500)
		res.send({ error })
	}
};

const addNewContact = async (req, res) => {
    try {
        const { error } = validator('contact', req.body);
        if (error) {
            return validationErrors(res, error);
        }
        const contact = new contactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })
        await contact.save()
        res.status(201).send(contact)
    } catch (error) {
		res.status(500)
		res.send({ error })
	}
};

module.exports = {
    getAllContact,
    addNewContact
}
