import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const ItemContainer = ({ imageSrc, title, location, data, callfunction, latitude, longitude, onUpdateMarker }) => {
  const navigation = useNavigation();
  const newMarker = {
    id: new Date().getTime(),
    coordinate: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  };
  return (
    <TouchableOpacity
    onPress={() => {
      callfunction(); 
      onUpdateMarker(newMarker); 
    }}
    style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "row"
      }}
    >
      <Image
        source={{ uri: imageSrc }}
        style={{ width: "40%", height: 120, borderRadius: 10 }}
      />

      {title && (
        <View style={{ marginTop: 5, marginLeft: 20, flex: 1 }}>
          <Text style={{ color: "#428288", fontSize: 14, fontWeight: "bold", flexWrap: 'wrap', textAlign: 'left' }} numberOfLines={2}>
            {title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <FontAwesome name="map-marker" size={20} color="#8597A2" />
            <Text style={{ color: "#428288", fontSize: 12, fontWeight: "bold", marginLeft: 5 }} numberOfLines={2}>
              {location}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemContainer;
