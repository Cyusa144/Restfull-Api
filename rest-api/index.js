import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import routes from "./routes";

import ENV from "dotenv";

ENV.config();
const app = express();

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.use(express.json()); // new
app.use("/api", routes);
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Bootcamp project"
    });
});

const port = process.env.PORT || 5000;

app.on('ready', function() { 
    app.listen(port, function(){ 
        console.log("app is ready"); 
    }); 
});

mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true
} );
mongoose.connection.once('open', function() {
    app.emit('ready'); 
});

export default app;