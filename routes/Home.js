import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation module
import Header from "../components/header";
import Hero from "../components/hero";
import Taskbuttons from "../components/taskButtons";
import Navigation from "../components/navigation";
import Posts from "./posts";

export default function HomePage() {
    const navigation = useNavigation(); // Get the navigation object

    function navigateToJobs() {
        navigation.navigate('OpenJobs'); // Navigate to OpenJobs screen
    };


    function navigateToBookings() {
        navigation.navigate("AllBookings")
    }
    function navigateToPosts() {
        navigation.navigate("Posts")
    }
    function navigateTovideoPlayer() {
        navigation.navigate("VideoPlayer")
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header />
            {/* Hero Section */}
            <Hero text={"Lets See What We Have Today"} style={{ backgroundColor: "white" }} />

            {/* Main Content */}
            <View style={styles.mainContent}>
                <Text style={styles.sectionTitle}>Whats Happening?</Text>
                {/* Display featured services or listings here */}
                <Taskbuttons title="Open Jobs" icon="search" page="Home" navigate={navigateToJobs} />
                <Taskbuttons title="Bookings" page="Home" icon="briefcase" navigate={navigateToBookings} />
                <Taskbuttons title="Posts" page="Home" icon="camera" navigate={navigateToPosts} />
                <Taskbuttons title="Camera" page="Home" icon="camera" navigate={navigateTovideoPlayer} />

                {/* Add more service cards as needed */}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Need Help, Contact Us @ :07471138575</Text>
            </View>

            {/* Navigation Bar */}
            <Navigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange",
        width: "100%"
    },
    mainContent: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
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
});
