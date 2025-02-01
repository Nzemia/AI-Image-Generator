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
import { fontFamily } from "../../constants/fonts"
import { Ionicons } from "@expo/vector-icons"
import ImageCard from "@/components/ImageCard"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"

const HomeScreen = () => {
    const { theme } = useTheme()
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)   
    const [image, setImage] = useState(
        "https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_640.jpg"
    )
    
    const handleOpenLink = () => {
        const url = "https://github.com/nzemia"
        Linking.openURL(url).catch(err =>
            console.error("An error occurred", err)
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    {
                        backgroundColor: theme.background
                    }
                ]}
            >
                <View style={styles.appLogo}>
                    <Text
                        style={[
                            styles.appName,
                            { color: theme.primary }
                        ]}
                    >
                        DreamAI
                    </Text>

                    <TouchableOpacity
                        onPress={handleOpenLink}
                    >
                        <Text style={styles.madeBy}>
                            Click{" "}
                            <Text style={styles.name}>
                                Nzemia
                            </Text>{" "}
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
                            style={[
                                styles.textInput,
                                {
                                    backgroundColor:
                                        theme.background,
                                    color: theme.text
                                }
                            ]}
                            value={prompt}
                            onChangeText={setPrompt}
                        />
                        {prompt ? (
                            <TouchableOpacity
                                style={styles.clearButton}
                            >
                                <Ionicons
                                    name={
                                        "trash-bin-outline"
                                    }
                                    size={24}
                                    color={theme.secondary}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>

                {/**Generate button */}
                <TouchableOpacity
                    style={[
                        styles.generateButton,
                        {
                            backgroundColor:
                                theme.background
                        }
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator
                            size="small"
                            color="#fff"
                        />
                    ) : (
                        <Text
                            style={[
                                styles.generateText,
                                { color: theme.text }
                            ]}
                        >
                            Generate
                        </Text>
                    )}
                </TouchableOpacity>

                {/**Description */}
                {!image && (
                    <Text style={styles.description}>
                        This is a demo of DreamAI, a
                        generative AI app that allows you to
                        generate images based on your
                        prompts. DreamAI uses the Stable
                        Diffusion model to generate images,
                        which means it can create realistic
                        and detailed images.
                    </Text>
                )}

                {image && (
                    <View style={styles.imageWrapper}>
                        <ImageCard
                            item={{
                                imageUrl: image,
                                prompt: "Generated AI image"
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
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingBottom: 30
    },
    appLogo: {
        alignItems: "center",
        marginTop: 20
    },
    appName: {        
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
