import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert, Vibration } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

import Header from "../components/header";
import Navigation from "../components/navigation";

export default function Posts() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const navigation = useNavigation();
    const videoRefs = useRef([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const token = await AsyncStorage.getItem("AccessToken");

            const response = await fetch("https://remoteclub-8tjf.onrender.com/TradesmaPosts/", {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setVideos(data.videos);
            } else {
                throw new Error("Failed to fetch video data");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoPress = (index) => {
        setSelectedVideoIndex(index);
        if (videoRefs.current[index]) {
            videoRefs.current[index].presentFullscreenPlayer();
        }
    };

    const handleVideoLongPress = (index) => {
        Vibration.vibrate(100);
        setDeleteIndex(index);
    };

    const handleDelete = async (index) => {
        const token = await AsyncStorage.getItem("AccessToken");
        const videoId = videos[index]._id; // Assuming each video has an 'id' field

        try {
            const response = await fetch(`https://remoteclub-8tjf.onrender.com/TradesmaPosts/delete/${videoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const newVideos = videos.filter((_, i) => i !== index);
                setVideos(newVideos);
                setDeleteIndex(null);
                Alert.alert("Video deleted successfully");
            } else {
                throw new Error("Failed to delete video");
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Failed to delete video");
        }
    };

    const handleCloseDelete = () => {
        if (deleteIndex !== null) {
            handleDelete(deleteIndex); // Trigger delete if deleteIndex is not null
        } else {
            setDeleteIndex(null); // Otherwise just close the delete overlay
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.videoItem}
            onPress={() => handleVideoPress(index)}
            onLongPress={() => handleVideoLongPress(index)}
        >
            <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: item.videoName }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
                shouldPlay={selectedVideoIndex === index}
                onPlaybackStatusUpdate={status => {
                    if (status.didJustFinish) {
                        setSelectedVideoIndex(null);
                    }
                }}
            />
            {deleteIndex === index && (
                <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => handleDelete(index)}
                >
                    <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading videos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                keyboardShouldPersistTaps="handled"
            />
            {deleteIndex !== null && (
                <View style={styles.overlay}>
                    <TouchableOpacity
                        style={styles.overlayButton}
                        onPress={handleCloseDelete}
                    />
                </View>
            )}
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
    videoItem: {
        margin: 5,
        width: 100,
        height: 100,
        backgroundColor: 'black',
        position: 'relative',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        padding: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayButton: {
        flex: 1,
        width: '100%',
    },
});
