import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Button } from "react-native";



export default function JobButton(props) {
    <>
        <TouchableOpacity onPress={acceptJob}>
            <Text style={styles.button}>Accept Job</Text>
        </TouchableOpacity>

        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.successText}>{successMessage}</Text>
                        <Button title="Close" onPress={() => setShowModal(false)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    button: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    footer: {
        padding: 10,
        backgroundColor: "#ccc",
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "black",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
    },
    successText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
