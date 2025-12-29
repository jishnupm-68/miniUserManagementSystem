const express = require("express");
const accountController =  require("../controller/accountController")
const accountRouter = express.Router();

accountRouter.post("/signup", accountController.signup)
accountRouter.post("/login", accountController.login)
accountRouter.post("/logout", accountController.logout);
module.exports = accountRouter