import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import {  NotFound } from "../assets";
import MenuContainer from "../components/MenuContainer";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../api";
import MapScreen from "./MapScreen.js";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {DIRECTION_API_KEY} from '../store/api.js';
import { getWeatherData } from "../api/weather.js";

const Discover = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  const [marker, setMarker] = useState(null);
  const [weatherData, setWeatherData] = useState(null); // State for weather data

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    });

    // Fetch weather data on component mount
    getWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  const handleMapButtonPress = () => {
    setType(""); 
  };

  const handleMarkerUpdate = (newMarker) => {
    setMarker(newMarker);
  };

  const renderContentView = () => {
    if (type === "") {
      return (
        <>
          <MapScreen marker={marker}/>         
        </>
      
    )} else {
      return (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: "#2C7379", fontSize: 24, fontWeight: "bold" }}>{type.charAt(0).toUpperCase() + type.slice(1)} near me</Text>
            <TouchableOpacity 
            onPress={() => {
              handleMapButtonPress(); 
              handleMarkerUpdate(null); 
            }}
           >
              <MaterialCommunityIcons name="map-outline" size={24} color="#2C7379"/>
              <Text style={{ color: "#2C7379", fontSize: 12, fontWeight: "bold" }}>Map</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#0B646B" />
            </View>
          ) : (
            <ScrollView>
              <View style={{ paddingHorizontal: 5, marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap", marginStart: 10 }}>
                {mainData?.length > 0 ? (
                  mainData.map((data, i) => {
                    if (data?.photo?.images?.medium?.url) {
                      return (
                        <ItemCarDontainer
                          key={i}
                          imageSrc={data.photo.images.medium.url}
                          title={data.name}
                          location={data.address}
                          data={data}
                          latitude= {data.latitude}
                          longitude={data.longitude}
                          callfunction={handleMapButtonPress}
                          onUpdateMarker={handleMarkerUpdate}
                        />
                      );
                    } else {
                      return null;
                    }
                  })
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
      <View style={styles.weatherContainer}>
        {weatherData && (
          <>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }} style={styles.weatherIcon} />
            <View style={styles.weatherInfo}>
            <Text style={styles.weatherTemperature}>{Math.round((weatherData.main.temp - 32) / 1.8)}°C</Text>
              <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
            </View>
          </>
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", marginHorizontal: 20, borderRadius: 20, paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 20 }}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Research"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
            const newMarker = {
              id: new Date().getTime(),
              coordinate: {
                latitude: details?.geometry?.viewport?.southwest?.lat,
                longitude: details?.geometry?.viewport?.southwest?.lng,
              },
            };
            handleMarkerUpdate(newMarker);
          }}
          query={{
            key: DIRECTION_API_KEY,
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

const styles = {
  weatherContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherInfo: {
    marginLeft: 10,
  },
  weatherTemperature: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C7379",
  },
  weatherDescription: {
    fontSize: 16,
    color: "#2C7379",
  },
};

export default Discover;
