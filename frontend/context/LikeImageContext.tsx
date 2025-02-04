import {
    createContext,
    useEffect,
    useState,
    ReactNode
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ToastAndroid } from "react-native"

type Image = {
    _id: string
}

type LikeImagesContextType = {
    likedImages: Image[]
    toggleLikeImage: (genImage: Image) => Promise<void>
}

export const LikeImagesContext =
    createContext<LikeImagesContextType | null>(null)

type LikeImageProviderProps = {
    children: ReactNode
}

export const LikeImageProvider = ({
    children
}: LikeImageProviderProps) => {
    const [likedImages, setLikedImages] = useState<Image[]>(
        []
    )

    useEffect(() => {
        loadLikedImages()
    }, [])

    const loadLikedImages = async () => {
        const images =
            await AsyncStorage.getItem("likedImages")
        const parsedImages: Image[] = images
            ? JSON.parse(images)
            : []
        setLikedImages(parsedImages)
    }

    const toggleLikeImage = async (genImage: Image) => {
        let likedImages =
            await AsyncStorage.getItem("likedImages")
        let parsedLikedImages: Image[] = likedImages
            ? JSON.parse(likedImages)
            : []

        const imageExists = parsedLikedImages.some(
            item => item._id === genImage._id
        )

        if (imageExists) {
            parsedLikedImages = parsedLikedImages.filter(
                item => item._id !== genImage._id
            )
            ToastAndroid.show(
                "Image removed from liked images!",
                ToastAndroid.SHORT
            )
        } else {
            parsedLikedImages.push(genImage)
            ToastAndroid.show(
                "Image added to liked images!",
                ToastAndroid.SHORT
            )
        }

        setLikedImages(parsedLikedImages)
        await AsyncStorage.setItem(
            "likedImages",
            JSON.stringify(parsedLikedImages)
        )
    }

    const value: LikeImagesContextType = {
        likedImages,
        toggleLikeImage
    }

    return (
        <LikeImagesContext.Provider value={value}>
            {children}
        </LikeImagesContext.Provider>
    )
}
