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

const DiscoverScreen = () => {
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

                {/** Content*/}
                <FlatList
                    data={data}
                    renderItem={({ index, item }) => {
                        return <ImageCard item={item} />
                    }}
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    //keyExtractor={item => item.id}
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
    listContainer: {
        paddingBottom: 50
    }
})
