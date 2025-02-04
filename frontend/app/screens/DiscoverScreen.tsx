import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/constants/ThemeContext"
import { fontFamily } from "@/constants/fonts"
import ImageCard from "@/components/ImageCard"
import api from "@/utils/api"
import { Feather } from "@expo/vector-icons"


type ImageItem = {
    id: string
    imageUrl: string
    prompt?: string
}

const DiscoverScreen = () => {
    const { theme } = useTheme()

    const [refresh, setRefresh] = useState(false)

    const [page, setPage] = useState(1)

    const [images, setImages] = useState<ImageItem[]>([])

    const [loading, setLoading] = useState(false)

    const [hasNextPage, setHasNextPage] = useState(true)

    const [searchQuery, setSearchQuery] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        handleFetchImages()
    }, [page, searchQuery])

    const handleFetchImages = async () => {
        try {
            setLoading(true)
            const response = await api.get(
                "/discover-image",
                {
                    params: {
                        page,
                        query:
                            searchQuery.trim() || undefined
                    }
                }
            )

            if (page === 1) {
                setImages(response.data.images)
            } else {
                setImages(prevImages => [
                    ...prevImages,
                    ...response.data.images
                ])
            }

            const isNextPage =
                response.data.totalPages >
                response.data.currentPage
            setHasNextPage(isNextPage)
        } catch (error) {
            ToastAndroid.show(
                "Sorry, something went wrong. Please try again later.",
                ToastAndroid.SHORT
            )
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMoreImages = async () => {
        if (hasNextPage && !loading && !isSearching) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const onRefresh = async () => {
        setRefresh(true)
        setPage(1)
        setImages([])
        await handleFetchImages()
        setRefresh(false)
    }

    const handleSearch = async () => {
        Keyboard.dismiss()
        if (!searchQuery.trim()) {
            return ToastAndroid.show(
                "Please enter a search term!",
                ToastAndroid.SHORT
            )
        }
        setIsSearching(true)
        setPage(1)
        setImages([])
        await handleFetchImages()
        setIsSearching(false)
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
                    {
                        backgroundColor: theme.background
                    }
                ]}
            >
                {/**Header */}
                <Text
                    style={[
                        styles.header,
                        {
                            color: theme.text
                        }
                    ]}
                >
                    Discover
                </Text>

                {/**Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search images..."
                        placeholderTextColor="#808080"
                        style={[
                            styles.searchInput,
                            {
                                borderColor: theme.text,
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                backgroundColor:
                                    theme.background,
                                color: theme.text
                            }
                        ]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <TouchableOpacity
                        style={[styles.searchButton]}
                        onPress={handleSearch}
                    >
                        <Feather
                            name="search"
                            size={20}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                </View>

                {/** Content*/}
                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <ImageCard item={item} />
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        styles.listContainer
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            tintColor={theme.text}
                        />
                    }
                    bounces={false}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator
                                size="small"
                                color={theme.text}
                            />
                        ) : !hasNextPage ? (
                            <Text
                                style={[
                                    styles.noMoreText,
                                    { color: theme.text }
                                ]}
                            >
                                No more images to show!
                            </Text>
                        ) : null
                    }
                    onEndReached={handleLoadMoreImages}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </SafeAreaView>
    )
}

export default DiscoverScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        fontFamily: fontFamily.bold,
        textAlign: "center",
        marginVertical: 15,
        fontSize: 24
    },
    searchContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        paddingLeft: 15,
        marginRight: 10
    },
    searchButton: {
        position: "absolute",
        right: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    listContainer: {
        paddingBottom: 50
    },
    noMoreText: {
        textAlign: "center",
        marginVertical: 20,
        fontFamily: fontFamily.regular
    }
})
