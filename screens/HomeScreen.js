// App.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles.js';
import MapScreen from './MapScreen.js';
import ThingsToDO from './ThingsToDo.js';
import Sights from './Sights.js';
import Discover from './Discover.js';



import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Discover}/>
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Things to DO" component={ThingsToDO} />
      <Drawer.Screen name="Sights" component={Sights} />
    </Drawer.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <MyDrawer />
    </View>
  );
}
