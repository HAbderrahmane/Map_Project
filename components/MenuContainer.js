import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BCC9',
    borderRadius: 8,
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 12, // Reduced padding
    width: 100, // Reduced fixed width for the button container
    marginHorizontal: 10, // Add horizontal margin between buttons
  },
  text: {
    color: 'white',
    fontSize: 10, // Reduced font size
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
});

export default MenuContainer;
