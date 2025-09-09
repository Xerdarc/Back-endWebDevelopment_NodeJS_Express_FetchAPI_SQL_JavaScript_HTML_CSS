// import required modules
const express = require("express")

// create a router object
const router = express.Router()

// import other route modules
const userroutes = require("../routes/userroutes")
const reviewroutes = require("../routes/reviewroutes")
const vulnerabilityroutes = require("../routes/vulnerabilityroutes")
const reportroutes = require("../routes/reportroutes")
const characterroutes = require("../routes/characterroutes")
const questroutes = require("../routes/questroutes")

// miscellaneous controllers
const usercontroller = require("../controllers/usercontroller")

// backend security modules
const bcrypt = require("../middlewares/bcrypt")
const jwt = require("../middlewares/jwt")

// ========== miscellaneous routes ==========
// register
router.post("/register", usercontroller.checkifusernameexists, usercontroller.register, bcrypt.hashpassword, usercontroller.postuser, jwt.generate, jwt.send)
// login
router.post("/login", usercontroller.login, bcrypt.comparepassword, jwt.generate, jwt.send)

// ========== individual routes ==========
router.use("/user", userroutes)
router.use("/review", reviewroutes)
router.use("/vulnerability", vulnerabilityroutes)
router.use("/report", reportroutes)
router.use("/character", characterroutes)
router.use("/quest", questroutes)

// export the router object
module.exports = router