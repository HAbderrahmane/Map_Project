import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../api";
import MapScreen from "./MapScreen.js";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      console.log(data[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  const renderContentView = () => {
    if (type === "") {
      return (
        <>
          <MapScreen />
        </>
      );
    } else {
      return (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ color: "#2C7379", fontSize: 28, fontWeight: "bold" }}>{type} near me</Text>
          </View>
          {isLoading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#0B646B" />
            </View>
          ) : (
            <ScrollView>
              <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {mainData?.length > 0 ? (
                 mainData.map((data, i) => (
                  data?.photo?.images?.medium?.url && (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={data.photo.images.medium.url}
                      title={data.name}
                      location={data.location_string}
                      data={data}
                    />
                  )
                ))
                
                ) : (
                  <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                    <Image source={NotFound} style={{ width: 100, height: 100 }} />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Oops... No Data Found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </>
      );
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", marginHorizontal: 20, borderRadius: 20, paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 20 }}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyBRrOrJrXUwNSuX9eVQzRqyUL84lr9A1-o",
            language: "en",
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <MenuContainer key={"hotels"} title="Hotels"  type={type} setType={setType} />
            <MenuContainer key={"attractions"} title="Attractions" type={type} setType={setType} />
            <MenuContainer key={"restaurants"} title="Restaurants"  type={type} setType={setType} />
      </View>
      
      {renderContentView()}

                </SafeAreaView>
                );
                };
                
export default Discover;
