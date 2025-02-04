const Together = require("together-ai")
const { uploadBase64Image } = require("../utils")
const ImageModal = require("../model/ImageModel")

const generateImage = async (req, res) => {
    try {
        // together ai flux model
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

        //insert to mongodb database
        const newImage = new ImageModal({
            imageUrl,
            prompt
        })
        await newImage.save()

        return res.status(200).json({
            imageUrl
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const getImage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const searchQuery = req.query.query?.trim() || ""

        let filter = {}
        if (searchQuery) {
            filter = {
                $or: [
                    {
                        prompt: {
                            $regex: searchQuery,
                            $options: "i"
                        }
                    },
                    {
                        tags: {
                            $regex: searchQuery,
                            $options: "i"
                        }
                    }
                ]
            }
        }

        const totalImages = await ImageModal.countDocuments(
            filter
        )
        const images = await ImageModal.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })

        const data = {
            images,
            totalPages: Math.ceil(totalImages / limit),
            currentPage: page
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    generateImage,
    getImage
}
