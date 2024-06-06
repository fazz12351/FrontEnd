import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = await AsyncStorage.getItem('AccessToken');
                const response = await fetch('https://remoteclub-8tjf.onrender.com/TradesmaPosts/allPosts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setVideos(data.data);

            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Video
                // ref={useRef(null)}
                style={styles.video}
                source={{ uri: item.videoName }}
                resizeMode="cover"
                isLooping
                shouldPlay
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item._id} // Assuming _id is a string, if not convert it accordingly
                pagingEnabled
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'black',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default VideoPlayer;
