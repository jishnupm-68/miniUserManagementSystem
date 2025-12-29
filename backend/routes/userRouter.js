const userController  = require("../controller/userController")
const express= require("express");
const { auth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/user/getData", auth, userController.getUserData);
userRouter.patch("/user/editUserData", auth, userController.editUserData);
userRouter.patch("/user/editPassword", auth, userController.editUserPassword);
module.exports = userRouter
