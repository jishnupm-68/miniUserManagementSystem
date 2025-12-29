require("dotenv").config();
const express = require("express"); 
const app = express(); 
const connectDb = require("./config/db"); 
const accountRouter = require("./routes/accountRouter");
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser())
app.use("/", accountRouter); 
const PORT = process.env.PORT || 5000;
connectDb() 
.then(() => { 
    console.log("db connected successfully");
    app.listen(PORT, () => { 
        console.log(`Server running on port ${PORT}`); }); 
    }) 
.catch((e) => { console.log("Error while connecting to db:", e.message); });