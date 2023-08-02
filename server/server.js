const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 4000 || process.env.PORT
const cors = require('cors');
const paymentRoute = require('./routes/paymentRoute');
const connectDB = require('./config/db');
 connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",paymentRoute);

app.get("/api/getkey",(req,res)=>{
        res.status(200).json({key: process.env.RAZORPAY_API_KEY})
});

app.listen(PORT,()=>{
    console.log(`Server run on Port ${PORT}`);
});