import contactModel from "../models/contact";



const getAllContact = async (req, res) => {
    try {
        const contact = await contactModel.find()
        res.status(200).send({contact})
    } catch (error) {
		res.status(500).json({ error })
	
	}
};

const addNewContact = async (req, res) => {
    try {
        const contact = new contactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })
        await contact.save()
        res.status(201).send({message: "successfully created contact",contact })
    } 
    catch (error) {
		res.status(500).json({ error })
	}
};
const getSingleContact = async (req, res) => {
	try {
        const contact = await contactModel.findOne({ _id: req.params.id })
        if(!contact) return res.status(404).json({status: 404,message: 'invalid contact id'})
        return res.status(200).send({message: "successfully fetched contact", contact})
	} catch(error) {
        console.log(error.message)
        

	}
};

const deleteContact = async (req, res) => {
	try {
		await contactModel.deleteOne({ _id: req.params.id })
		res.status(204).send({ success: "contact successfully deleted" })
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
