import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import ImageCard from "@/components/ImageCard"
import { AntDesign, Ionicons } from "@expo/vector-icons"

const LikeScreen = () => {
    const { theme } = useTheme()

    const [refresh, setRefresh] = useState(false)

    const data = [
        {
            id: 1,
            imageUrl:
                "https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_640.jpg",
            prompt: "Generate an AI image"
        },
        {
            id: 2,
            imageUrl:
                "https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_640.jpg",
            prompt: "Generate an AI image"
        },
        {
            id: 3,
            imageUrl:
                "https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_640.jpg",
            prompt: "Generate an AI image"
        }
    ]

    const onRefresh = () => {
        setRefresh(true)

        setRefresh(false)
    }
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
                    data={data}
                    renderItem={({ index, item }) => {
                        return <ImageCard item={item} />
                    }}
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={[
                        styles.listContainer,
                        data.length === 0 &&
                            styles.emptyListContainer
                    ]}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            tintColor={theme.text}
                        />
                    }
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
