import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { Alert } from "react-native"



{
    /** do not forget to grant permissions in android and expo-media-library in app.json*/
}
export const handleDownload = async (
    imageUrl: string,
    setDownloading: (downloading: boolean) => void,
    setDownloadProgress: (progress: number) => void
) => {
    const fileName = `downloaded_image_ai_${Date.now()}.jpg`
    const fileUri = `${FileSystem.documentDirectory}${fileName}`

    try {
        setDownloading(true)

        const downloadResumable =
            FileSystem.createDownloadResumable(
                imageUrl,
                fileUri,
                {},
                ({
                    totalBytesWritten,
                    totalBytesExpectedToWrite
                }) => {
                    const progress =
                        (totalBytesWritten /
                            totalBytesExpectedToWrite) *
                        100
                    setDownloadProgress(
                        Math.floor(progress)
                    )
                }
            )

        const downloadResult =
            await downloadResumable.downloadAsync()

        if (
            downloadResult &&
            downloadResult.status === 200
        ) {
            const { status } =
                await MediaLibrary.requestPermissionsAsync()
            if (status !== "granted") {
                throw new Error(
                    "Permission to access media library is required."
                )
            }

            await MediaLibrary.createAssetAsync(
                downloadResult.uri
            )

            Alert.alert(
                "Success",
                "Image downloaded and saved to gallery!"
            )
        } else {
            throw new Error("Failed to download image.")
        }
    } catch (err) {
        Alert.alert("Error", "Failed to download image")
    } finally {
        setDownloading(false)
        setDownloadProgress(0)
    }
}
