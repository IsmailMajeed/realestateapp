import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SlideModal } from 'react-native-slide-modal';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SliderOpt({ title, cities, show, onClose, value }) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{ position: 'absolute' }}>
      <SlideModal
        modalType="iOS Form Sheet"
        // modalType="iOS Bottom Sheet"
        modalVisible={show}
        modalContainer={
          <View
            style={{
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderWidth: 0,
              width: '100%',
              height: screenHeight - 120,
              // marginTop: filteredCities.length > 30 ? 130 : 0
              // height: '100%'
              // transform: [{ translateY }],
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}>{title}</Text>
            <View>
              <TextInput
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                style={styles.inputStyle}
                placeholder='Search City'
                placeholderTextColor={'gray'} />
              <MaterialCommunityIcons
                style={{ position: 'absolute', bottom: 12, left: 10 }}
                name={'magnify'}
                color={'gray'}
                size={23} />
            </View>
            <Text style={{ fontWeight: '600', marginVertical: 10 }}>All cities</Text>
            <ScrollView
            >
              {
                filteredCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    activeOpacity={0.5}
                    onPress={() => {
                      onClose(city);
                    }}
                  >
                    <Text style={{ fontSize: 12, color: 'gray', borderWidth: 0, paddingVertical: 5 }}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>
        }
        modalHeaderTitle=""
        pressDone={() => onClose(value)}
        pressCancel={() => onClose(value)}
        darkMode={false}
        doneDisabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 38,
    paddingVertical: 15,
    borderRadius: 5,
  }
})