// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './styles';
import MapScreen from './screens/MapScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MapScreen />
      </NavigationContainer>
    </View>
  );
}
