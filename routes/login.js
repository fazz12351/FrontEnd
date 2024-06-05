import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import Header from "../components/header";
import Hero from "../components/hero";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keyboardShown, setKeyboardShown] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading behavior
    const navigation = useNavigation();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShown(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShown(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleLogin = async () => {
        setLoading(true); // Start loading

        try {
            const response = await fetch("https://remoteclub-8tjf.onrender.com/TradesmanLogin/login_Tradesman", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();

            if (response.ok) {
                const tokenFromResponse = data.token;
                await AsyncStorage.setItem("AccessToken", tokenFromResponse);
                navigateToHome();
            } else {
                throw new Error("Wrong username or password")
                console.error("Error:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false); // Stop loading, whether successful or with an error
        }
    };

    const navigateToHome = () => {
        navigation.navigate('HomePage');
    };

    return (
        <View style={styles.container}>
            <Header />
            <Hero text={"Login"} style={{ backgroundColor: "white" }} />
            {!keyboardShown && (
                <Image
                    source={require('../assets/TradesmansWorld.png')} // Replace with the path to your image
                    style={styles.logo}
                    resizeMode="contain" // Ensure the entire image is visible within its container
                />
            )}
            <KeyboardAvoidingView
                style={styles.mainContent}
                behavior="padding"
            >

                <TextInput
                    style={styles.loginInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.loginInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" /> // Show loading indicator while loading
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Need Help, Contact Us @ :07471138575</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        position: "relative"
    },
    mainContent: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
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
    loginInput: {
        padding: 10,
        width: "80%",
        borderWidth: 1,
        borderColor: "red",
        marginVertical: 10,
    },
    loginButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
    },
    logo: {
        height: 400,
        aspectRatio: 1, // Maintain aspect ratio
        marginBottom: 20, // Add margin bottom as needed
    },
});
