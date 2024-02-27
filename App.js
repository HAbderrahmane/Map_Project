//App.js
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import MapScreen from './screens/MapScreen.js';

export default function App() {
 
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
}