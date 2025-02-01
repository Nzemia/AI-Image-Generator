import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import {
    Feather,
    FontAwesome,
    FontAwesome6
} from "@expo/vector-icons"

const ImageCard = ({ item }: { item: any }) => {
    const { theme } = useTheme()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <View
                style={[
                    styles.imageCard,
                    { backgroundColor: theme.background }
                ]}
            >
                {/**Image */}
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/**Prompt Text*/}
                <Text
                    style={[
                        styles.promptText,
                        { color: theme.text }
                    ]}
                    numberOfLines={2}
                >
                    {item.prompt || "No prompt"}
                </Text>

                {/**Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor:
                                    theme.secondary
                            }
                        ]}
                    >
                        <FontAwesome
                            name="download"
                            size={20}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor:
                                    theme.secondary
                            }
                        ]}
                    >
                        <Feather
                            name="share-2"
                            size={20}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor:
                                    theme.secondary
                            }
                        ]}
                    >
                        <FontAwesome6
                            name="copy"
                            size={20}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            {
                                backgroundColor:
                                    theme.secondary
                            }
                        ]}
                    >
                        <FontAwesome
                            name="heart"
                            size={20}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                </View>

                {/** modal container */}
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={true}
                >
                    <View
                        style={[
                            styles.overlay,
                            {
                                backgroundColor:
                                    "rgba(0,0,0,0.7)"
                            }
                        ]}
                    >
                        <View
                            style={[
                                styles.progressContainer,
                                {
                                    backgroundColor: "#222"
                                }
                            ]}
                        >
                            <Text
                                style={styles.progressTitle}
                            >
                                Downloading Image...
                            </Text>

                            <Text
                                style={styles.progressText}
                            >
                                0%
                            </Text>

                            <Text
                                style={
                                    styles.progressDescription
                                }
                            >
                                Please wait while the image
                                is being downloaded!
                            </Text>

                            <View
                                style={[
                                    styles.progressBarContainer,
                                    {
                                        backgroundColor:
                                            theme.background
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        styles.progressBar,
                                        { width: `${50}%` },
                                        {
                                            backgroundColor:
                                                "#76c7c0"
                                        }
                                    ]}
                                ></View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    imageCard: {
        width: "100%",
        padding: 15,
        marginBottom: 20,
        borderRadius: 8
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 8
    },
    promptText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: fontFamily.regular,
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    actionButton: {
        padding: 10,
        borderRadius: 50,
        alignItems: "center"
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    progressContainer: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    progressTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        marginBottom: 10
    },
    progressText: {
        fontFamily: fontFamily.regular,
        fontSize: 20,
        marginBottom: 10
    },
    progressDescription: {
        fontFamily: fontFamily.light,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10
    },
    progressBarContainer: {
        width: "100%",
        height: 10,
        borderRadius: 10,
        marginTop: 10
    },
    progressBar: {
        height: 10,
        borderRadius: 5
    }
})
