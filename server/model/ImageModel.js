const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
        prompt: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ImageModal = mongoose.model("Image", imageSchema)
module.exports = ImageModal
