import userModel from "../models/user";
import { generateToken } from "../helpers/token";
import {
	validator,
	validationErrors
} from "../validation";


const addNewUser = async (req, res) => {
	try {
		const user = new userModel({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		await user.save()
		res.status(201).send({user})
	}
	catch (error) {
		res.status(500)
		console.log( error )
		// res.send({ error })
	}
};

const loginUser = async(req, res) => {
	try {
		const user = await userModel.findOne({ email: req.body.email, password: req.body.password })
		if (!user) return res.status(404).send({ message: "Invalid username or password" })
		const userinfo = {
			id: user._id,
			name: user.name
		};
		const token = await generateToken(userinfo);
		res.status(200).send({token})
	} catch(error) {
		res.status(404)
		res.send({ error: "user doesn't exist!" })
	}
};

export {
    addNewUser,
    loginUser
}
