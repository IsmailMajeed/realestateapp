import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FilterContext } from '../../Context/FiltersContext';
import { Image, ImageBackground } from 'expo-image';

export default function Header({ navigation }) {
  var logo = 'https://livechat.propsure.co/var/storagetheme/2023y/02/27/4/48e419a4721f6c3d80f64d6f1cbe6d11.png';
  // const [isBuy, setIsBuy] = useState(true);
  const { isBuy, setIsBuy } = useContext(FilterContext);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigation();

  const handleInputChange = (text) => {
    setInputValue(text);
    setSelectedOption(null); // Clear selected option when input changes
  };


  const data = [
    { id: '1', text: 'Islamabad' },
    { id: '2', text: 'Karachi' },
    { id: '3', text: 'Lahore' },
    { id: '4', text: 'Rawalpindi' },
    { id: '5', text: 'Okara' },
    { id: '6', text: 'Quetta' },
    // Add more data items as needed
  ];

  const handleItemSelect = (item) => {
    setSelectedOption(item);
    setInputValue(item.text); // Update TextInput value
    setIsSearching(false); // Hide the list of items
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setIsSearching(false)}>
      <ImageBackground
        contentFit='fill'
        source={require('../../assets/Images/HeaderImage.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: logo }}
            style={styles.tinyLogo}
          />
          <Text style={[styles.logo, styles.textWhite]}>Graana</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.textWhite, styles.textStyle]}>Buy or rent with trust</Text>
          <View style={{ flex: 0, flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setIsBuy(true);
                setIsSearching(false)
              }}
              activeOpacity={1}
              style={[styles.Button, isBuy ? styles.ActiveButton : '']}
            >
              <Text style={{ color: 'black' }}>BUY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsBuy(false);
                setIsSearching(false)
              }}
              activeOpacity={1}
              style={[styles.Button, !isBuy ? styles.ActiveButton : '']}
            >
              <Text style={{ color: 'black' }}>RENT</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{ flex: 0, flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, !isSearching ? styles.inActiveInputRadius : '']}
              onFocus={() => {
                setIsSearching(true);
              }}
              placeholder="Search by city or area"
              onChangeText={handleInputChange}
              value={inputValue}
            />
            <TouchableOpacity onPress={() => {
              if (isBuy)
                navigate.navigate('All Items Show Here');
              else
                navigate.navigate('All Items Show Here');
            }}
              activeOpacity={0.7}
              style={[styles.searchIcon, !isSearching ? styles.inActiveSearchRadius : '']}>
              <MaterialCommunityIcons
                name="magnify"
                color={'white'}
                size={25} />
            </TouchableOpacity>
            {isSearching && (
              <ScrollView
                style={styles.FlatListMenuStyle}>
                <Text style={{
                  paddingLeft: 15,
                  fontWeight: 'bold',
                  fontSize: 11
                }}>Top Searches</Text>
                {
                  data.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => handleItemSelect(item)}>
                      <View style={styles.item}>
                        <Text>{item.text}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }

                {/* <FlatList
                  style={styles.FlatListMenuStyle}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                /> */}
              </ScrollView>
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  ActiveButton: {
    backgroundColor: 'white',
  },
  Button: {
    backgroundColor: '#CECECE',
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  logo: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 25,
  },
  textWhite: {
    color: 'white',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 25,
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  backgroundImage: {
    height: 350,
  },
  input: {
    width: 300,
    height: 60,
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
  },
  searchIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E85451',
    borderTopRightRadius: 10,
  },
  inActiveInputRadius: {
    borderBottomLeftRadius: 10,
  },
  inActiveSearchRadius: {
    borderBottomRightRadius: 10,
  },
  FlatListMenuStyle: {
    backgroundColor: 'white',
    width: 360,
    height: 250,
    position: 'absolute',
    top: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 1,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    // borderTopWidth: 1,
    // borderColor: '#ccc',
    zIndex: 10,
  },
});