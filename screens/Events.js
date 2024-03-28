import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { X_RapidAPI_Key_Events } from '../store/api'; 
const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState('Guided tours');
  const [location, setLocation] = useState('Marseille');
  const [dateRange, setDateRange] = useState('week');

  useEffect(() => {
    fetchEvents();
  }, [eventType, location, dateRange]);

  const fetchEvents = async () => {
    const options = {
      method: 'GET',
      url: 'https://real-time-events-search.p.rapidapi.com/search-events',
      params: {
        query: `${eventType} in ${location}`,
        start: '0',
        date: dateRange
      },
      headers: {
        // X_RapidAPI_Key_Events
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setEvents(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setEvents([]); // Clear existing events if any
        alert('No events available at this time. Please try again later.');}
        else console.log(error);
     
    }
  };

  const handlePress = (link) => {
    Linking.openURL(link);
  };

  const handlePickerChangeType = (itemValue) => {
    setEventType(itemValue);
    fetchEvents();
  };

  const handlePickerChange = (itemValue) => {
    setDateRange(itemValue);
    fetchEvents();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Picker
          selectedValue={eventType}
         
          style={{ flex: 1, height: 50, marginRight: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}
          onValueChange={(itemValue) => handlePickerChangeType(itemValue)}
        >
          <Picker.Item label="Festivals" value="Festivals"  Style={{fontSize: 16,
            height: 50}} />
          <Picker.Item label="Concerts" value="Concerts" />
          <Picker.Item label="Sports" value="Sports" />
          <Picker.Item label="Art" value="Art" />
          <Picker.Item label="Guided tours" value="Guided tours" />
        </Picker>
        <Picker
          selectedValue={dateRange}
          style={{ flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}
          onValueChange={(itemValue) => handlePickerChange(itemValue)}
        >
          <Picker.Item label="Today" value="today" />
          <Picker.Item label="This Week" value="week" />
          <Picker.Item label="Next Week" value="next_week" />
          <Picker.Item label="Weekend" value="weekend" />
          <Picker.Item label="Tomorrow" value="tomorrow" />
          <Picker.Item label="This Month" value="month" />
          <Picker.Item label="Next Month" value="next_month" />
        </Picker>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.event_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.link)}>
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 300, height: 200, resizeMode: 'cover', borderRadius: 10 }} />
              <TouchableOpacity onPress={() => handlePress(item.link)}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center', textDecorationLine: 'underline' }}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = {
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  }};

export default Events;
