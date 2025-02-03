const express = require("express")
const { generateImage, getImage } = require("../controllers/ImageController")

const router = express.Router()


router.post("/generate-image", generateImage)
router.get("/discover-image", getImage)

module.exports = router
