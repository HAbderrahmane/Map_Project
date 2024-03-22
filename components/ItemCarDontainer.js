import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ItemContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        width: 152,
      }}
    >
      <Image
        source={{ uri: imageSrc }}
        style={{ width: "100%", height: 120, borderRadius: 10 }}
      />

      {title && (
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: "#428288", fontSize: 18, fontWeight: "bold" }}>
            {title.length > 14 ? `${title.slice(0, 14)}..` : title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <FontAwesome name="map-marker" size={20} color="#8597A2" />
            <Text style={{ color: "#428288", fontSize: 14, fontWeight: "bold", marginLeft: 5 }}>
              {location?.length > 18 ? `${location.slice(0, 18)}..` : location}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemContainer;
