import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
    return <View style={styles.headerContainer}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Tradesman App</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
    },
    header: {
        padding: 40,
        backgroundColor: "orange",
        alignItems: "center",
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    headerText: {

        fontSize: 24,
        color: "white",
    },
})