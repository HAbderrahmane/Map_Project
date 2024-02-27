import * as Location from 'expo-location';

export async function getLocationPermissions() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export function watchLocation() {
  return Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
    (location) => {
      console.log('Location updated:', location);
    }
  );
}
export async function getCurrentLocation() {
  let { coords } = await Location.getCurrentPositionAsync({});
  return { latitude: coords.latitude, longitude: coords.longitude };
}