import * as Clipboard from "expo-clipboard"
import { Alert } from "react-native"


export const copyToClipboard = async (imageUrl: string) => {
    try {
        await Clipboard.setStringAsync(imageUrl)
        Alert.alert(
            "Copied!",
            "Image URL copied to clipboard."
        )
    } catch (error) {
        Alert.alert("Error", "Failed to copy image URL.")
    }
}
