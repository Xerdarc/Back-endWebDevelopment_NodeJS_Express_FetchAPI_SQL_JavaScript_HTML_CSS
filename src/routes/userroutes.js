// import required modules
const express = require("express")

// create router object
const router = express.Router()

// import the corresponding controllers (+ security implementations)
const controller = require("../controllers/usercontroller")
const jwt = require("../middlewares/jwt")

// define router requests
router.put("/", jwt.verifytoken, controller.checkifusernameexists, controller.checkifuseridexists, controller.checkifusernameexists, controller.put)
router.get("/", jwt.verifytoken, controller.getbytoken)
router.get("/characters", jwt.verifytoken, controller.getassociation)

// export the router object
module.exports = router