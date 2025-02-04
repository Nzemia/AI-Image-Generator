import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useContext, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import ImageCard from "@/components/ImageCard"
import { Ionicons } from "@expo/vector-icons"
import { LikeImagesContext } from "@/context/LikeImageContext"

const LikeScreen = () => {
    const { theme } = useTheme()

    const context = useContext(LikeImagesContext)
    if (!context) {
        throw new Error(
            "LikeImagesContext must be used within a LikeImageProvider"
        )
    }
    const { likedImages } = context

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background
            }}
        >
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background }
                ]}
            >
                <Text
                    style={[
                        styles.header,
                        { color: theme.text }
                    ]}
                >
                    Liked Images
                </Text>

                <FlatList
                    data={likedImages}
                    renderItem={({ item }) => {
                        if (!item.imageUrl || !item._id) {
                            return null
                        }
                        return (
                            <ImageCard
                                key={item._id}
                                item={item}
                            />
                        )
                    }}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={[
                        styles.listContainer,
                        likedImages.length === 0 &&
                            styles.emptyListContainer
                    ]}
                    ListEmptyComponent={
                        <View
                            style={
                                styles.emptyStateContainer
                            }
                        >
                            <Ionicons
                                name="heart-dislike-sharp"
                                size={100}
                                color={theme.text}
                            />
                            <Text
                                style={[
                                    styles.emptyText,
                                    { color: theme.text }
                                ]}
                            >
                                You haven't liked any images
                                yet!
                            </Text>

                            <Text
                                style={[
                                    styles.subText,
                                    { color: theme.text }
                                ]}
                            >
                                Browse and like some images
                                to see them here.
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default LikeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        fontFamily: fontFamily.bold,
        fontSize: 24,
        textAlign: "center",
        marginTop: 20
    },
    emptyStateContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    emptyText: {
        fontFamily: fontFamily.medium,
        fontSize: 20,
        textAlign: "center",
        marginTop: 20
    },
    subText: {
        fontFamily: fontFamily.light,
        fontSize: 12,
        textAlign: "center",
        marginTop: 10
    },
    listContainer: {
        paddingBottom: 50
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: "center"
    }
})
