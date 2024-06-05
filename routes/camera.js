import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Camera = () => {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');

    const selectVideo = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need your permission to access your photos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setVideo(result);
        }
    };

    const uploadVideo = async () => {
        if (!video) return;

        const data = new FormData();
        data.append('file', {
            name: 'video.mp4',
            type: 'video/mp4',
            uri: video.assets[0].uri,
        });
        data.append('title', title); // Append title to the form data

        try {
            const token = await AsyncStorage.getItem("AccessToken");
            if (!token) {
                Alert.alert('Upload failed', 'No access token found');
                return;
            }

            const response = await axios.post('https://remoteclub-8tjf.onrender.com/TradesmaPosts/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                Alert.alert('Upload success', response.data.message);
            } else {
                throw new Error('Failed to upload video');
            }
        } catch (error) {
            console.error('Upload failed: ', error.response ? error.response.data : error.message);
            Alert.alert('Upload failed', error.response ? error.response.data.message : 'An error occurred while uploading the video.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Select Video" onPress={selectVideo} />
            {video && (
                <View>
                    <Video
                        {...console.log(video)}
                        source={{ uri: video.assets[0].uri }}
                        style={styles.video}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                    />
                    <Button title="Upload Video" onPress={uploadVideo} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    video: {
        width: 300,
        height: 300,
        backgroundColor: 'black',
        marginTop: 20,
    },
});

export default Camera;
