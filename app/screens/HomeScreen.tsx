import {
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import React, { useState } from "react"
import { colors, fontFamily } from "../../constants/theme"
import { Ionicons } from "@expo/vector-icons"
import ImageCard from "@/components/ImageCard"

const HomeScreen = () => {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(
        "https://singularityhub.com/uploads/2019/01/robot-artificial-intelligence-avatar_shutterstock_1121111882.jpg?auto=webp"
    )

    const handleOpenLink = () => {
        const url = "https://github.com/nzemia"
        Linking.openURL(url).catch(err =>
            console.error("An error occurred", err)
        )
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View style={styles.appLogo}>
                <Text style={styles.appName}>DreamAI</Text>

                <TouchableOpacity onPress={handleOpenLink}>
                    <Text style={styles.madeBy}>
                        Click{" "}
                        <Text style={styles.name}>
                            Nzemia{" "}
                        </Text>
                        to view more of my work
                    </Text>
                </TouchableOpacity>
            </View>

            {/**Input container */}
            <View style={styles.textInputWrapper}>
                <View style={styles.textInputContainer}>
                    {}
                    <TextInput
                        placeholder="Enter your prompt here..."
                        placeholderTextColor={"#808080"}
                        multiline
                        style={styles.textInput}
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                    {prompt ? (
                        <TouchableOpacity
                            style={styles.clearButton}
                        >
                            <Ionicons
                                name={"trash-bin-outline"}
                                size={24}
                                color={colors.secondary}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            {/**Generate button */}
            <TouchableOpacity style={styles.generateButton}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color="#fff"
                    />
                ) : (
                    <Text style={styles.generateText}>
                        Generate
                    </Text>
                )}
            </TouchableOpacity>

            {/**Description */}
            {!image && (
                <Text style={styles.description}>
                    This is a demo of DreamAI, a generative
                    AI app that allows you to generate
                    images based on your prompts. DreamAI
                    uses the Stable Diffusion model to
                    generate images, which means it can
                    create realistic and detailed images.
                </Text>
            )}

            {image && (
                <View style={styles.imageWrapper}>
                    <ImageCard
                        item={{
                            imageUrl: image,
                            prompt: "Generate an AI image"
                        }}
                    />
                </View>
            )}

            {/**Footer */}
            {!image && (
                <Text style={styles.footer}>
                    Made with ❤️ by Nzemia
                </Text>
            )}
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingBottom: 30
    },
    appLogo: {
        alignItems: "center",
        marginTop: 20
    },
    appName: {
        color: colors.secondary,
        fontFamily: fontFamily.bold,
        fontSize: 32,
        textAlign: "center"
    },
    madeBy: {
        color: "#808080",
        fontFamily: fontFamily.regular,
        fontSize: 12,
        marginTop: 5
    },
    name: {
        textDecorationLine: "underline"
    },

    textInputWrapper: {
        marginTop: 20
    },
    textInputContainer: {
        position: "relative"
    },
    textInput: {
        width: "100%",
        height: 120,
        borderWidth: 2,
        borderColor: "#565656",
        borderRadius: 10,
        backgroundColor: "#222",
        color: colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: fontFamily.regular,
        fontSize: 16
    },
    clearButton: {
        position: "absolute",
        right: 10,
        top: 10
    },
    generateButton: {
        marginTop: 20,
        backgroundColor: "#000",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderBottomWidth: 10,
        borderColor: "#f8f2f2"
    },
    generateText: {
        color: "#fff",
        fontFamily: fontFamily.semiBold,
        fontSize: 20
    },
    description: {
        color: "#808080",
        fontFamily: fontFamily.regular,
        fontSize: 14,
        textAlign: "center",
        marginTop: 20
    },
    footer: {
        color: "#808080",
        fontFamily: fontFamily.light,
        fontSize: 12,
        textAlign: "center"
    },
    imageWrapper: {
        marginTop: 20,
        alignItems: "center",
        elevation: 10
    }
})
