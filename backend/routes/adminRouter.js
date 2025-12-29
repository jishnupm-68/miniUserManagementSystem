const express =require("express");
const { adminAuth } = require("../middleware/adminAuth");
const adminRouter = express.Router();
const adminController = require("../controller/adminController")
adminRouter.get("/admin/getData", adminAuth, adminController.getData)
adminRouter.patch("/admin/editStatus", adminAuth,adminController.updateStatus )
module.exports = adminRouter