const express = require("express")
const { generateImage } = require("../controllers/ImageController")

const router = express.Router()


router.post("/generate-image", generateImage)

module.exports = router
