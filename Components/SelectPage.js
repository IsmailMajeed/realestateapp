import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomHeader from "./CustomHeader";
import { ThemeContext } from "../Context/ThemeContext";
import { Styles } from "./CommonStyling/Styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cities } from "../Data/Data";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SelectPage = ({ route }) => {
  const { city } = route.params;
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('')

  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const filteredAreas = areas.filter((area) =>
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const apiKey = 'AIzaSyBz7WVH77Mfgjv8_XJVKYtIhiOK5XGvsKs';
    // Make a request to the OpenStreetMap Nominatim API
    axios.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
      // axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}+areas&key=${apiKey}`)
      .then(response => {
        // Extract the areas from the API response
        const areas = response.data.map(result => result.display_name);
        // const areas = response.data.results.map(result => result.name);
        setAreas(areas);
      })
      .catch(error => {
        console.error('Error fetching areas: ', error);
      });
  }, [city]);

  const navigation = useNavigation();
  const handleSelectedArea = (area) => {
    // const updatedAreas = [...selectedAreas]; // Copy the selectedAreas array

    // const areaIndex = updatedAreas.indexOf(area);
    // if (areaIndex !== -1) {
    //   // Area exists, remove it
    //   updatedAreas.splice(areaIndex, 1);
    // } else {
    //   // Area doesn't exist, add it
    //   updatedAreas.push(area);
    // }
    setSelectedAreas(area);
    route.params.setItem(area)
    navigation.goBack()
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1, gap: 20 }}>
      <CustomHeader title="Select Location" />
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={styles.inputStyle}
            placeholder='Search Area'
            placeholderTextColor={'gray'} />
          <MaterialCommunityIcons
            style={{ position: 'absolute', bottom: 12, left: 10 }}
            name={'magnify'}
            color={'gray'}
            size={23} />
        </View>
        <Text style={[Styles.heading, { paddingHorizontal: 16 }]}>All Areas</Text>
        <View style={styles.areaListStyle}>
          {
            filteredAreas.map((area, index) => (
              <TouchableOpacity
                onPress={() => handleSelectedArea(area)}
                key={index}>
                <Text>{area}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectPage;

const styles = StyleSheet.create({
  areaListStyle: {
    paddingHorizontal: 20,
    gap: 20
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 38,
    paddingVertical: 15,
    borderRadius: 5,
  },
  searchContainer: {
    marginHorizontal: 20
  },
  selectedContent: {
    width: 120,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
