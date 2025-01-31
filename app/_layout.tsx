import { useState } from "react"
import { View, ActivityIndicator } from "react-native"
import * as Font from "expo-font"
import { Slot } from "expo-router"
import { fontFamily } from "../constants/theme"

const loadFonts = () => {
    return Font.loadAsync({
        [fontFamily.regular]: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        [fontFamily.bold]: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
        [fontFamily.semiBold]: require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        [fontFamily.light]: require("../assets/fonts/SpaceGrotesk-Light.ttf"),
        [fontFamily.medium]: require("../assets/fonts/SpaceGrotesk-Medium.ttf")
    })
}

export default function Layout() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (!fontsLoaded) {
        loadFonts().then(() => setFontsLoaded(true))
        return (
            <ActivityIndicator size="large" color="black" />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Slot />
        </View>
    )
}
