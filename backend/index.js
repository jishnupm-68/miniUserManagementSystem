require("dotenv").config();
const express = require("express"); 
const app = express(); 
const connectDb = require("./config/db"); 
const accountRouter = require("./routes/accountRouter");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  process.env.CORS_ORIGIN_URL,          
  process.env.CORS_ORIGIN_URL_PRODUCTION
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"] 
}));


app.use("/", accountRouter); 
app.use("/", adminRouter)
app.use("/", userRouter)
const PORT = process.env.PORT || 5000;
connectDb() 
.then(() => { 
    console.log("db connected successfully");
    app.listen(PORT, () => { 
        console.log(`Server running on port ${PORT}`); }); 
}) 
.catch((e) => { 
    console.log("Error while connecting to db:", e.message); 
});