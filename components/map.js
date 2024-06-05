import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Map = ({ address }) => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(true); // Always full screen

  const MIN_LATITUDE_DELTA = 0.005;
  const MIN_LONGITUDE_DELTA = 0.005;
  const MAX_LATITUDE_DELTA = 100;
  const MAX_LONGITUDE_DELTA = 100;

  const getCoordinates = async () => {
    const apiKey = 'e6143154e1c245b3a8b53252615c0554'; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setLocation({ latitude: lat, longitude: lng });
        setMapRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        setLocation({ latitude: 0, longitude: 0 });
        setMapRegion({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error(error);
      setLocation({ latitude: 0, longitude: 0 });
      setMapRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    getCoordinates();
  }, [address]);

  const zoomIn = () => {
    if (mapRegion && mapRegion.latitudeDelta > MIN_LATITUDE_DELTA && mapRegion.longitudeDelta > MIN_LONGITUDE_DELTA) {
      setMapRegion({
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta / 2,
        longitudeDelta: mapRegion.longitudeDelta / 2,
      });
    }
  };

  const zoomOut = () => {
    if (mapRegion && mapRegion.latitudeDelta * 2 < MAX_LATITUDE_DELTA && mapRegion.longitudeDelta * 2 < MAX_LONGITUDE_DELTA) {
      setMapRegion({
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta * 2,
        longitudeDelta: mapRegion.longitudeDelta * 2,
      });
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={isFullScreen ? styles.fullScreenContainer : styles.container}>
      {/* <TouchableOpacity style={styles.fullScreenButton} onPress={toggleFullScreen}>
        <Text style={styles.fullScreenButtonText}>Full Screen</Text>
      </TouchableOpacity> */}
      <View style={styles.mapContainer}>
        {location && (
          <MapView style={styles.map} region={mapRegion}>
            <Marker coordinate={location} title="Job Location" />
          </MapView>
        )}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenContainer: {
    flex: 1,
  },
  fullScreenButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  fullScreenButtonText: {
    color: 'black',
    fontSize: 16,
  },
  mapContainer: {
    width: '100%',
    height: '100%', // Changed height to fill the screen
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  zoomControls: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
  },
  zoomButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  zoomText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Map;
