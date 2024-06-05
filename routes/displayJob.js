import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Button, Linking, Dimensions } from "react-native";

import Header from "../components/header";
import Taskbuttons from "../components/taskButtons";
import Navigation from "../components/navigation";
import Map from "../components/map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clock from "../components/clock";
import { useNavigation } from '@react-navigation/native';

export default function DisplayJob(props) {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false); // State to track full screen mode
    const navigation = useNavigation();

    const navigateToBookings = () => {
        navigation.navigate("AllBookings", { forceRefresh: Math.random() });
    }

    const callContact = () => {
        const phoneNumber = props.route.params.job.telephone;
        Linking.openURL(`tel:0${phoneNumber}`);
    }

    const acceptJob = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("AccessToken");
            const response = await fetch(`https://remoteclub-8tjf.onrender.com/TradesmanJob/openJob/${props.route.params.job._id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log("Job accepted successfully");
                setSuccessMessage("Job applied successfully");
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigation.goBack();
                    navigation.navigate("OpenJobs", { forceRefresh: true });
                }, 2000);
            } else {
                throw new Error("Already Pressed and Applied");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const declineJob = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem("AccessToken");
            const response = await fetch(`https://remoteclub-8tjf.onrender.com/TradesmanJob/openJob/${props.route.params.job._id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                setSuccessMessage("Job deleted successfully");
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigation.goBack();
                    navigation.navigate("AllBookings", { forceRefresh: true });
                }, 2000);
            } else {
                throw new Error("Already Pressed and Applied");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const isListJobsPage = props.route.params.page === 'listJobs';
    const isViewJobsPage = props.route.params.page === "viewJobs";

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Display job details... */}

                <View style={styles.currentJobContent}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Name:</Text>
                        <Text style={styles.tableText}>{props.route.params.job.firstname} {props.route.params.job.lastname}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Job Title:</Text>
                        <Text style={styles.tableText}>{props.route.params.job.jobtitle}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Job Description:</Text>
                        <Text style={styles.tableText}>{props.route.params.job.jobdescription}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Location:</Text>
                        <Text style={styles.tableText}>{props.route.params.job.address}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Contact:</Text>
                        <TouchableOpacity onPress={callContact}>
                            <Text style={[styles.tableText, styles.contactText]}>{`0${props.route.params.job.telephone}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Render different buttons based on the page */}
                {isListJobsPage && (
                    <TouchableOpacity onPress={acceptJob}>
                        <Text style={styles.acceptButton}>Save Job</Text>
                    </TouchableOpacity>
                )}

                {isViewJobsPage && (
                    <TouchableOpacity onPress={declineJob}>
                        <Text style={styles.declineButton}>Unsave Job</Text>
                    </TouchableOpacity>
                )}

                {/* Modal */}
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

                {/* Pass isFullScreen state to the Map component */}
                <TouchableOpacity style={isFullScreen ? styles.fullScreenContainer : styles.container} onPress={toggleFullScreen}>
                    <Map address={props.route.params.job.address} />
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Need Help, Contact Us @ :07471138575</Text>
            </View>
            <Navigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        position: "relative"
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    acceptButton: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    declineButton: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "red",
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
        padding:
        20,
        borderRadius: 8,
      },
      currentJobContent: {
        fontSize: 16,
        marginTop: 5,
      },
      label: {
        fontWeight: "bold",
        marginTop: 10,
      },
      contactText: {
        color: "blue",
        marginTop: 5,
      },
      successText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
      },
      fullScreenContainer: {
        flex: 1,
        backgroundColor: "black",
      },
      // Table styles
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
      },
      tableHeader: {
        flex: 1,
        fontWeight: 'bold',
      },
      tableText: {
        paddingLeft:10,
        flex: 3,
      },
      });
      
      