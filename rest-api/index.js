import express from "express";
import mongoose from "mongoose";// new
import routes from "./routes";

const ENV = require("dotenv");

ENV.config();

mongoose
	.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true,useUnifiedTopology: true })
	.then(() => {
        const app = express();
		app.use(express.json()); // new
        app.use("/api/", routes);
        app.get('/', (req, res) => {
            res.send({
                message: "Welcome to Bootcamp project"
            });
        });

		app.listen(process.env.PORT, () => {
			console.log("Server has started!");
		});
	}) 