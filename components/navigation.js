import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';



export default function Navigation() {
    const navigation = useNavigation(); // Get the navigation object

    function navigateToHome() {
        navigation.navigate('HomePage'); // Navigate to OpenJobs screen
    };
    function navigateToProfile() {
        navigation.navigate('Profile'); // Navigate to OpenJobs screen

    }
    function navigateToCamera() {
        console.log("going to camera")
        navigation.navigate("Camera")
    }
    return <View style={styles.navigation}>
        <Icon onPress={navigateToHome} name="home" size={28} color="black" />
        <View onPress={navigateToCamera} style={styles.cameraView}>
            <Icon onPress={navigateToCamera} name="video-camera" size={32} color="black" />
        </View>
        <Icon onPress={navigateToProfile} name="user" size={28} color="black" />
    </View>

}

const styles = StyleSheet.create({
    navigation: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "grey",
    },
    cameraView: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 50,
        borderRadius: 20,
        backgroundColor: "white"
    }
})