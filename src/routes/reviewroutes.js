// import required modules
const express = require("express")

// create router object
const router = express.Router()

// import the corresponding controllers (+ security implementations)
const controller = require("../controllers/reviewcontroller")
const jwt = require("../middlewares/jwt")

// define router requests
router.post("/", jwt.verifytoken, controller.post)
router.get("/", jwt.verifytoken, controller.get)
router.get("/user", jwt.verifytoken, controller.getbyid)
router.delete("/:review_id", jwt.verifytoken, controller.checkuserreview, controller.checkuserown, controller.controllerdelete)
router.get("/:review_id", jwt.verifytoken, controller.getbyreviewid)
router.put("/:review_id", jwt.verifytoken, controller.put)

// export the router object
module.exports = router