import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity } from 'react-native';


import { styles } from '../styles.js';
import * as LocationService from '../services/LocationService';
import Map from '../components/Map';

export default function MapScreen({ marker }) {
  const [location, setLocation] = useState({
    latitude: 43.29763114204085,
    longitude: 5.371892663034785,
  });
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destination, setDestination] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await LocationService.getLocationPermissions();
      if (!hasPermission) {
        console.error('Location permission not granted');
        return;
      }

      const initialLocation = await LocationService.getCurrentLocation();
      console.log('Initial Location:', initialLocation);

      setLocation(initialLocation.coords);

      const locationSubscription = await LocationService.watchLocation((newLocation) => {
        console.log('Location changed in MapScreen:', newLocation);
        setLocation(newLocation);
      });

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    if (marker) {
      setMarkers([marker]);
      setSelectedMarker(marker);
      mapRef.current.animateToRegion({
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  }, [marker]);

  const handleMapPress = async (event) => {
    const newMarker = {
      id: new Date().getTime(),
      coordinate: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      },
    };
    console.log('Sending Marker to Parent:', newMarker);
    setMarkers([newMarker]);
    setSelectedMarker(newMarker);

    mapRef.current.animateToRegion({
      latitude: newMarker.coordinate.latitude,
      longitude: newMarker.coordinate.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const handleGetDirections = () => {
    if (selectedMarker) {
      const { latitude, longitude } = selectedMarker.coordinate;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error('Cannot open Google Maps');
        }
      });
    }
  };

  const handleMarkerPress = (markerId) => {
    setSelectedMarker(markers.find((marker) => marker.id === markerId));
  };

  return (
    <View style={styles.container}>
      <Map
        location={location}
        markers={markers}
        routeCoordinates={routeCoordinates}
        mapRef={mapRef}
        selectedMarker={selectedMarker}
        handleMapPress={handleMapPress}
        handleMarkerPress={handleMarkerPress}
        handleGetDirections={handleGetDirections}
      />
    </View>
  );
}
