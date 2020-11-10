import express from "express";
import mongoose from "mongoose";// new
import routes from "./routes";

import ENV from "dotenv";

ENV.config();
const app = express();
mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true,useUnifiedTopology: true });

app.use(express.json()); // new
app.use("/api/", routes);
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Bootcamp project"
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server has started!");
});
export default app;