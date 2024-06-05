import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from "../components/header";
import Taskbuttons from "../components/taskButtons";
import Navigation from "../components/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clock from "../components/clock";

const AllBooking = ({ route }) => {
    const [jobs, setJobs] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused(); // Hook to detect when the screen is focused

    const getAllBookings = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("AccessToken");

            const response = await fetch('https://remoteclub-8tjf.onrender.com/TradesmanProfile/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setJobs(data.responce.bookings);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Refresh bookings if the screen is focused or forceRefresh parameter is true
        if (isFocused || (route.params && route.params.forceRefresh)) {
            getAllBookings();
        }
    }, [isFocused, route.params]);

    const handleTaskButtonPress = (job, page = "viewJobs") => {
        // Navigate to displayJob.js and pass the job information as params
        navigation.navigate('DisplayJobs', { job, page });
    };

    return (
        <View style={styles.container}>
            <Header>
                <Clock />
            </Header>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Saved Jobs</Text>
                {jobs.map(job => (
                    <Taskbuttons
                        key={job._id}
                        page="Jobs"
                        title={job.jobtitle}
                        icon="briefcase"
                        description={job.jobdescription}
                        func={() => handleTaskButtonPress(job)}
                    />
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Need Help, Contact Us @ :07471138575</Text>
            </View>
            <Navigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        flexGrow: 1,
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

export default AllBooking;
