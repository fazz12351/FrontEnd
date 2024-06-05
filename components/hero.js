import React from "react";
import { View, StyleSheet, Text } from "react-native";


export default function Hero(props) {
    return < View style={styles.hero} >
        <Text style={styles.heroText}>{props.text}</Text>
        {/* Add a hero image or video here if available */}
    </View >
}

const styles = StyleSheet.create({
    hero: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
    },
    heroText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
})


