const { mongo } = require("mongoose")

const connectDB = async () => {
    try {
        await mongo.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to MongoDB!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}


module.exports = {
    connectDB
}