import React from 'react';
import { View, Text, Image} from 'react-native';
import {SafeAreaInset} from 'react-native-safe-area-context'
import { styles } from '../styles.js';
import About from './About.js';
import Discover from './Discover.js';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import EventsComponent from './Events.js';
import Planning from './planning.js';

const Drawer = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
        <Image source={require('../assets/MarseillePic.jpg')} style={{ width: 130, height: 130, borderRadius: 80 }} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  console.warn = () => {};
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#6200EE',
        inactiveTintColor: '#333',
        labelStyle: { fontSize: 16, fontWeight: 'bold' },
        backgroundColor: '#f0f0f0',
      }}
      SafeAreaInset={{ top: 'always', horizontal: 'never' }} 
    >
    
        
      {<Drawer.Screen name="Home" component={Discover} />}
      {<Drawer.Screen name="Events and Tours" component={EventsComponent} />}
      {<Drawer.Screen name="Trip Planning" component={Planning} />}
      {<Drawer.Screen name="About" component={About} />}
        
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
