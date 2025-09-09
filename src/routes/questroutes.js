// import required modules
const express = require("express")

// create router object
const router = express.Router()

// import the corresponding controllers (+ security implementations)
const controller = require("../controllers/questcontroller")
const jwt = require("../middlewares/jwt")

// define router requests
router.get("/", jwt.verifytoken, controller.getall)
router.put("/", jwt.verifytoken, controller.getcredits)

// export the router object
module.exports = router