import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Header from "../components/header";
import Hero from "../components/hero";
import Navigation from "../components/navigation";

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const navigation = useNavigation(); // Use useNavigation hook directly

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            // Get the authentication token from AsyncStorage or wherever you store it
            const token = await AsyncStorage.getItem("AccessToken");

            const response = await fetch("https://remoteclub-8tjf.onrender.com/TradesmanProfile/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the request headers
                }
            });
            const data = await response.json();

            if (response.ok) {
                setProfileData(data); // Set profile data in state
                console.log(data)
            } else {
                throw new Error("Failed to fetch profile data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    async function logOut() {
        try {
            await AsyncStorage.clear()
            navigation.navigate('LoginPage'); // Use navigation directly
        }
        catch (err) {
            throw new Error(err)
        }

    }

    return (
        <View style={styles.container}>
            <Header />
            <Hero text={profileData ? `${profileData.responce.firstname} ${profileData.responce.lastname}` : "Loading..."} style={{ backgroundColor: "white" }}></Hero>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Render profile information here */}
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/FaeemAhmed.jpeg')} // Replace with the path to your image
                        style={styles.profilePicture}
                    />

                    {profileData && (
                        <View style={styles.userInformation}>
                            <View style={styles.informationContainer}>
                                <Text style={styles.label}>First Name:</Text>
                                <Text style={styles.information}>{profileData.responce.firstname}</Text>
                            </View>
                            <View style={styles.informationContainer}>
                                <Text style={styles.label}>Last Name:</Text>
                                <Text style={styles.information}>{profileData.responce.lastname}</Text>
                            </View>
                            <View style={styles.informationContainer}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.information}>{profileData.responce.email}</Text>
                            </View>
                        </View>
                    )}

                    {/* Logout button */}
                    <View style={styles.logOutButton}>
                        <Button onPress={logOut} title="Log Out" color="black" />
                    </View>
                </View>
            </View>

            {/* Navigation Bar */}
            <Navigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
    },
    profileContainer: {
        paddingTop: 20,
        borderRadius: 10,
        backgroundColor: "orange",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderColor: "grey", // Add border color
        borderWidth: 1, // Add border width
    },
    mainContent: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        padding: 20,
        zIndex: 0,
    },
    profilePicture: {
        position: "absolute",
        top: 40,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userInformation: {
        paddingTop: 20,
        paddingBottom: 20,
        width: "90%",
        alignItems: 'center',
    },
    informationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 100,
        textAlign: 'right',
        marginRight: 10,
        fontWeight: 'bold',
    },
    information: {
        flex: 1,
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 1,
        backgroundColor: "orange",
        padding: 10,
    },
    logOutButton: {
        position: 'absolute',
        bottom: 20,
        width: '50%',
        alignItems: 'center',
        borderWidth: 1, // Add border
        borderColor: "grey", // Border color
        borderRadius: 10
    }
});
