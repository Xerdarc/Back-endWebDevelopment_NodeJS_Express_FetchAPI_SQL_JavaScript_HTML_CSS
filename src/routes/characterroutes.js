const express = require("express")
const router = express.Router()

const controller = require("../controllers/charactercontroller")
const jwt = require("../middlewares/jwt")

router.get("/", controller.getall)
router.get("/credits", jwt.verifytoken, controller.getcreds)
router.post("/", jwt.verifytoken, controller.deductcredits, controller.getcharid, controller.association)

module.exports = router