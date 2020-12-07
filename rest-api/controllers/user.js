// import userModel from "../models/user";
import User from "../models/user";

import { generateToken } from "../helpers/token";



const addNewUser = async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		await user.save()
		res.status(201).send({message: " user successfully created ",user})
	}
	catch (error) {
		res.status(500).json({ error })
	}
};

const loginUser = async (req, res) => {
	console.log(User)
	try {
		const user = await User.findOne({ email: req.body.email})
		console.log(user)
		if (!user) return res.status(404).send({ message: "Invalid username or password" })
		const userinfo = {
			id: user._id,
			name: user.name
		};
		const token = await generateToken(userinfo);
		res.status(200).send({token})
	} catch(error) {
		res.status(404).send({ error:error.message})
	}
};


export {
    addNewUser,
    loginUser
}
