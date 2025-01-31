import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"

const ImageCard = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.imageUrl }}
                style={{ flex: 1 , height: 200, width: 200 }}
            />
        </View>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
