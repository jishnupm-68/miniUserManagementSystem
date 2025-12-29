const userController  = require("../controller/userController")
const express= require("express");
const { userAuth } = require("../middleware/userAuth");
const userRouter = express.Router();

userRouter.get("/user/getData", userAuth, userController.getUserData);
userRouter.patch("/user/editUserData", userAuth, userController.editUserData);
userRouter.patch("/user/editPassword", userAuth, userController.editUserPassword);
module.exports = userRouter
