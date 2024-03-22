//MapScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity } from 'react-native';
import { SearchBar, makeStyles } from 'react-native-elements';
import axios from 'axios';
import {styles} from '../styles.js'
import { OPEN_ROUTE_SERVICE_API_KEY } from '../store/api.js'; // Import the API key from environment variables
import * as LocationService from '../services/LocationService';
import Map from '../components/Map';
import HotelsButton from '../components/HotelsButton.js';


export default function MapScreen() {
  
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
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

    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car`,
        {
          coordinates: [
            [location.longitude, location.latitude],
            [newMarker.coordinate.longitude, newMarker.coordinate.latitude],
          ],
        },
        {
          headers: {
            'Authorization': {OPEN_ROUTE_SERVICE_API_KEY},
          },
        }
      );

      if (response.data.features && response.data.features.length > 0) {
        const routeCoords = response.data.features[0].geometry.coordinates;
        setRouteCoordinates(routeCoords);
      }
      
    } catch (error) {
      console.info('Driving route not available. ');
      
      console.info('Trying an alternative mode.');
      
    }

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
    setSelectedMarker(markers.find(marker => marker.id === markerId));
    setRouteCoordinates([]);
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=geocode&key={OPEN_ROUTE_SERVICE_API_KEY}`
      );

      if (response.data.predictions) {
        setSearchResults(response.data.predictions);
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  const handleResultPress = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key={OPEN_ROUTE_SERVICE_API_KEY}`
      );

      if (response.data.result) {
        const result = response.data.result;
        const newDestination = {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        };

        setDestination(newDestination);
        setRouteCoordinates([]);
        setSearchQuery(result.formatted_address);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
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
      <SearchBar
        placeholder="Search for a location"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {searchResults.length > 0 && (
        <View>
          {searchResults.map((result) => (
            <Text
              key={result.place_id}
              onPress={() => handleResultPress(result.place_id)}
            >
              {result.description}
            </Text>
          ))}
        </View>
      )}

       {/* Hotels Button */}
       <HotelsButton />

        {/* Search results rendering */}
        {searchResults.length > 0 && (
          <View>
            {searchResults.map((result) => (
              <Text
                key={result.place_id}
                onPress={() => handleResultPress(result.place_id)}
              >
                {result.description}
              </Text>
            ))}
          </View>
        )}
    </View>
  );
}
