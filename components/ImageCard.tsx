import {
    Image,
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
            </View>
        </SafeAreaView>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    imageCard: {
        width: "100%",
        padding: 10,
        marginBottom: 3,
        borderRadius: 10
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
    }
})
