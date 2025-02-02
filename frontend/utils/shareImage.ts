import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import { Alert } from "react-native"


export const shareImage = async (imageUrl: string) => {
    try {        
        const fileName = `shared_image_${Date.now()}.jpg`
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`

        const downloadResult =
            await FileSystem.downloadAsync(
                imageUrl,
                fileUri
            )

        if (downloadResult.status !== 200) {
            throw new Error(
                `Failed to download image: Status ${downloadResult.status}`
            )
        }

        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync()
        if (!isAvailable) {
            Alert.alert(
                "Error",
                "Sharing is not available on this device."
            )
            return
        }

        // Share the image
        await Sharing.shareAsync(downloadResult.uri)
    } catch (error) {
        Alert.alert(
            "Error",
            "Failed to share image!"
        )
    }
}
