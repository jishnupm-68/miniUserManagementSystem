const express =require("express");
const { auth } = require("../middleware/auth");
const adminRouter = express.Router();
const adminController = require("../controller/adminController")
adminRouter.get("/admin/getData", auth, adminController.getData)
adminRouter.patch("/admin/editStatus", auth,adminController.updateStatus )
module.exports = adminRouter