import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function TaskButtons(props) {
    if (props.page === "Home") {
        return (
            <TouchableOpacity style={styles.serviceCard} onPress={props.navigate}>
                <Text style={styles.serviceTitle}>{props.title}</Text>
                <Icon name={props.icon} size={20} color="black" />

            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity style={styles.serviceCardJob} onPress={props.func}>
                <Text style={styles.serviceTitleJob}>{props.title}</Text>
                <Text style={styles.description}>{props.description}</Text>
                <View style={styles.bottomCardContainer}>
                    <Icon name="map-marker" size={15} color="black" />
                    <Text style={styles.bottomCardText}>SW23PT</Text>
                    <Icon style={{ paddingLeft: 10 }} name="phone" size={15} color="black" />
                    <Text style={styles.bottomCardText}>07471138575</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    serviceCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    serviceTitle: {
        fontSize: 16,
        marginRight: 10,
    },
    serviceTitleJob: {
        fontSize: 15,
        marginRight: 0,
    },
    serviceCardJob: {
        position: "relative",
        flexDirection: "row",
        backgroundColor: "#e0e0e0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        height: 100
    },
    description: {
        position: "absolute",
        top: 30,
        fontSize: 10,
        paddingLeft: 10
    },
    bottomCardContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10
    },
    bottomCardText: {
        fontSize: 12,
        marginLeft: 5,
    }
});
