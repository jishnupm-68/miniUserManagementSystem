require("dotenv").config()
const express = require("express");
const app = express();
const connectDb = require("./config/db")

connectDb().
then(()=>{
    console.log("db connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on port ${process.env.PORT}` );
    })
})
.catch((e)=>{
    console.log("Error while connecting to db: "+ e.message);
})