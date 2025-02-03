import { ToastAndroid } from "react-native"
import api from "./api"

export const handleGenerateImage = async (
    prompt: string,
    setLoading: (loading: boolean) => void,
    setImage: (image: string) => void
) => {
    try {
        if (!prompt.length) {
            ToastAndroid.show(
                "Please enter a prompt",
                ToastAndroid.SHORT
            )
            return
        }

        setLoading(true)

        const response = await api.post("/generate-image", {
            prompt
        })

        //console.log("API Response:", response.data)

        setLoading(false)
        ToastAndroid.show(
            "Image generated successfully!",
            ToastAndroid.SHORT
        )

        if (setImage && response.data.imageUrl) {
            setImage(response.data.imageUrl)
        }

        return response.data
    } catch (error) {
        console.error("Error generating image:", error)
        ToastAndroid.show(
            "Error generating image",
            ToastAndroid.SHORT
        )
        setLoading(false)
        throw error
    }
}
