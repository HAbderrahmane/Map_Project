// HotelsButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HotelsButton = () => {
  const navigation = useNavigation();

  const handleHotelsPress = () => {
    navigation.navigate('Hotels'); 
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleHotelsPress}
    >
      <Text style={styles.buttonText}>Hotels</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.5)', 
    padding: 10,
    borderRadius: 50, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HotelsButton;
