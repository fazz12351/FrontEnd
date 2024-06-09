import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Header from "../components/header";
import Hero from "../components/hero";
import Navigation from "../components/navigation";

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("AccessToken");

            const response = await fetch("https://remoteclub-8tjf.onrender.com/TradesmanProfile/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setProfileData(data);
            } else {
                throw new Error("Failed to fetch profile data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    async function logOut() {
        try {
            await AsyncStorage.clear();
            navigation.navigate('LoginPage');
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <Hero text={profileData ? `${profileData.responce.firstname} ${profileData.responce.lastname}` : "Loading..."} style={{ backgroundColor: "white" }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/FaeemAhmed.jpeg')}
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

                    <View style={styles.logOutButton}>
                        <Button onPress={logOut} title="Log Out" color="black" />
                    </View>
                </View>
            </ScrollView>

            <Navigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    profileContainer: {
        paddingTop: 40,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2, // Add shadow for Android
        shadowColor: "#000", // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 20,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    userInformation: {
        width: "100%",
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
        color: "#6c757d",
    },
    information: {
        flex: 1,
        borderRadius: 10,
        borderColor: "#6c757d",
        borderWidth: 1,
        backgroundColor: "#f8f9fa",
        padding: 10,
        color: "#495057",
    },
    logOutButton: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});
