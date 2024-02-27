import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { styles } from '../styles.js';

export default function Map(props) {
  const { location, markers, routeCoordinates, handleMapPress, handleMarkerPress, handleGetDirections } = props;

  return (
    <MapView
      ref={props.mapRef}
      style={styles.map}
      region={location ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      } : null}
      onPress={handleMapPress}
      showsUserLocation={true}  // Set to true to display the user's location
    >
      {/* Remove the blue marker for user's location */}
      {/* {location && <Marker coordinate={location} pinColor="blue" title="Your Location" />} */}
      
      {markers.map((marker) => {
        if (marker.type === 'user') {
          return <Marker key={marker.id} coordinate={marker.coordinate} pinColor="blue" title="Your Location" />;
        }

        return (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker.id)}
          />
        );
      })}
      {props.selectedMarker && (
        <Marker
          coordinate={props.selectedMarker.coordinate}
          pinColor="red"
          onPress={handleGetDirections}
        />
      )}
      {routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={2}
          strokeColor="#FF0000"
        />
      )}
    </MapView>
  );
}
