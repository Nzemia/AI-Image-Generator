const Together = require("together-ai")
const { uploadBase64Image } = require("../utils")

const generateImage = async (req, res) => {
    try {
        // together ai flux module
        const apiKey = process.env.TOGETHER_API_KEY
        const together = new Together({ apiKey })
        const { prompt } = req.body

        let response = await together.images.create({
            prompt: prompt,
            model: "black-forest-labs/FLUX.1-schnell-Free",
            width: 1024,
            height: 768,
            steps: 4,
            n: 1,
            response_format: "b64_json"
        })

        const base64Image = response?.data[0]?.b64_json

        const imageUrl = await uploadBase64Image(
            base64Image
        )

        return res.status(200).json({
            message: imageUrl
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    generateImage
}
