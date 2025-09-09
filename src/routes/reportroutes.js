const express = require("express")
const router = express.Router()

const controller = require("../controllers/reportcontroller")
const jwt = require("../middlewares/jwt")

router.post("/", jwt.verifytoken, controller.captureVul, controller.associate, controller.updateReputation, controller.show)
router.put("/:id", jwt.verifytoken, controller.captureRep, controller.getAssociatedVulnerability, controller.updateCloserReputation, controller.updateStatus, controller.showNewVulStat, controller.makeCloserId)
router.get("/open", jwt.verifytoken, controller.getopen)
router.get("/closed", jwt.verifytoken, controller.getclosed)

module.exports = router