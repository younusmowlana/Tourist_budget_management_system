const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const destinationRoute = require("./routes/destination");
const cors = require('cors');
app.use(cors())

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection is successfull!"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json());
app.use("/api/destination",destinationRoute);

app.listen(process.env.PORT || 5000, () =>{
    console.log("Backend server is running!");
})