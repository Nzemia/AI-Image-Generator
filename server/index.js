require("dotenv").config()
const express = require("express")
const imageRoutes = require("./routes/ImageRoutes")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

app.use("/api", imageRoutes)

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
        console.log("Connected to MongoDB!")
    })
    .catch(err => {
        console.log(err)
    })

app.get("/", (req, res) => {
    res.send("Hello World!")
})

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
