import axios from "axios"

const BASE_URL =
    "https://server-ai-image-gen.vercel.app/api"

const api = axios.create({
    baseURL: BASE_URL
})

export default api
