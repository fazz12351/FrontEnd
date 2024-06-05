import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Header from "../components/header";
import Taskbuttons from "../components/taskButtons";
import Navigation from "../components/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clock from "../components/clock";

const OpenJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const jwtToken = await AsyncStorage.getItem("AccessToken");;

                const response = await fetch('https://remoteclub-8tjf.onrender.com/TradesmanJob/openJobs', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                setJobs(data.response);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAllJobs();
    }, []);

    const handleTaskButtonPress = (job, page = "listJobs") => {
        // Navigate to displayJob.js and pass the job information as params
        navigation.navigate('DisplayJobs', { job, page });
    };


    return (
        <View style={styles.container}>
            <Header>
                <Clock />
            </Header>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Open Jobs:</Text>
                {jobs.map(job => (
                    <Taskbuttons
                        key={job._id}
                        page="Jobs"
                        title={job.jobtitle}
                        icon="briefcase"
                        description={job.jobdescription}
                        func={() => handleTaskButtonPress(job, "listJobs")}
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

export default OpenJobs;
