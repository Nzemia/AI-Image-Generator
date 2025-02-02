import { useState, useEffect } from "react"
import { View, ActivityIndicator } from "react-native"
import * as Font from "expo-font"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { fontFamily } from "@/constants/fonts"
import {
    ThemeProvider,
    useTheme
} from "@/constants/ThemeContext"

const loadFonts = async () => {
    await Font.loadAsync({
        [fontFamily.regular]: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        [fontFamily.bold]: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
        [fontFamily.semiBold]: require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        [fontFamily.light]: require("../assets/fonts/SpaceGrotesk-Light.ttf"),
        [fontFamily.medium]: require("../assets/fonts/SpaceGrotesk-Medium.ttf")
    })
}

export default function Layout() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true))
    }, [])

    if (!fontsLoaded) {
        return (
            <ActivityIndicator size="large" color="black" />
        )
    }

    return (
        <ThemeProvider>
            <ThemedLayout />
        </ThemeProvider>
    )
}

function ThemedLayout() {
    const { theme } = useTheme() // Get the current theme (light/dark)

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <StatusBar style={theme.statusBarStyle} />
            <Slot />
        </View>
    )
}
