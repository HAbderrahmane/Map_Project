import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
      Explore Marseille: Your Pocket Guide
      Unleash the vibrant spirit of Marseille with our all-in-one mobile app!
      
      Whether you're a history buff, a sun-seeker, or a foodie on a mission, our app is your essential travel companion. Discover hidden gems, navigate like a local, and make the most of your time in the captivating city of Marseille.
      
      
        </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    
    color: '#333',
    textAlign: 'center',
    padding: 20,
    marginBottom: 20,

  },
});

export default About;
