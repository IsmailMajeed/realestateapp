import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Swiper from '../Components/WantedPageComponents/Swiper';
import IntlPhoneField from 'react-native-intl-phone-field';
import CheckboxFormX from 'react-native-checkbox-form';
import { ThemeContext } from '../Context/ThemeContext';
import InputBox from '../Components/WantedPageComponents/InputBox';
import DropdownOpt from '../Components/WantedPageComponents/DropdownOpt';
import SliderOpt from '../Components/WantedPageComponents/SliderOpt';
import { cities } from '../Data/Data';
import { Styles } from '../Components/CommonStyling/Styles';
import { Image } from 'expo-image';

const SELL_IMG = 'https://i.postimg.cc/Pq77Bs2w/image-3.png';
const RENT_IMG = 'https://i.postimg.cc/qqV5vcfB/image-4.png';

export default function Wanted({ navigation }) {

  const [isBuy, setIsBuy] = useState(true);
  const [checked, setChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const [propertyType, setPropertyType] = useState("");
  const [kindType, setKindType] = useState("Residential");

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const onChangePropertyType = (text) => {
    setPropertyType(text);
  };

  const onChangeCity = (text) => {
    setCity(text);
  };

  const onChangeArea = (text) => {
    setArea(text);
  };

  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeDetails = (text) => {
    setDetails(text);
  };

  const mockData = [
    {
      label: "I have read and agree to the Graana's Term of Service",
      value: 'Agree'
    }
  ];

  const { theme } = useContext(ThemeContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitleStyle: {
        color: theme.text,
      },
    });
  }, [theme]);

  _onSelect = (item) => {
    // console.log(item);
    if (item[0].RNchecked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on the platform
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 10 }}>
          <View>
            <Swiper padding={20} images={[
              'https://i.postimg.cc/c4gQHHxJ/image-9.png',
              'https://i.postimg.cc/fRYmcr0n/image-10.png',
              'https://i.postimg.cc/sDk5Zrx4/image-11.png'
            ]} />
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>What are you looking for?</Text>
            <View style={styles.buyAndRentContainer}>
              <TouchableOpacity
                onPress={() => setIsBuy(true)}
                style={[styles.option, { borderColor: isBuy ? '#E85451' : 'lightgray' }]}
              >
                <Image
                  source={{ uri: SELL_IMG }}
                  style={{ width: 20, height: 20, objectFit: 'contain' }}
                />
                <Text>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsBuy(false)}
                style={[styles.option, { borderColor: !isBuy ? '#E85451' : 'lightgray' }]}
              >
                <Image
                  contentFit='contain'
                  source={{ uri: RENT_IMG }}
                  style={{ width: 20, height: 20 }}
                />
                <Text>Rent</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Provide details by filling out the form</Text>
            <View style={{ zIndex: 1 }}>
              <InputBox clicked={() => setShowDropdown(!showDropdown)} edit={false} showIcon={true} iconName={showDropdown ? 'chevron-up' : 'chevron-down'} label="Property Type" value={propertyType} onChangeText={(text) => {
                onChangePropertyType(text)
              }} />
              {
                showDropdown && (
                  <View style={[styles.dropdownStyling, Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,]}>
                    <DropdownOpt kindType={kindType} kind={propertyType} clicked={(type, value) => {
                      setPropertyType(value)
                      setKindType(type)
                      setShowDropdown(false)
                    }} />
                  </View>
                )
              }
            </View>
            <View>
              <InputBox clicked={() => {
                setShowDropdown(false)
                setShowSlider(true)
              }}
                label="City of interest"
                value={city}
                edit={false}
                iconName='chevron-down'
                showIcon={true}
                onChangeText={(text) => {
                  onChangeCity(text)
                  setShowSlider(false)
                }} />
              {
                showSlider && (
                  <SliderOpt title={'Select City'}
                    value={city}
                    onClose={(city) => {
                      setShowSlider(false)
                      setCity(city)
                    }
                    }
                    cities={cities}
                    show={showSlider}
                  />
                )
              }
            </View>
            <InputBox clicked={() => setShowDropdown(false)} label="Area of interest" value={area} onChangeText={(text) => {
              onChangeArea(text)
            }} />
            <InputBox clicked={() => setShowDropdown(false)} label="Name" value={name} onChangeText={(text) => {
              onChangeName(text)
            }} />
            <IntlPhoneField
              // onEndEditing={(result) => console.log(result)}
              // onValidation={(isValid) => console.log(isValid)}
              defaultCountry="PK"
              defaultPrefix="+92"
              defaultFlag="🇵🇰"
              containerStyle={Styles.inputStyling}
            />
            <InputBox multiline={true} clicked={() => setShowDropdown(false)} label="Additional Details" value={details} onChangeText={(text) => {
              onChangeDetails(text)
            }} />
            <CheckboxFormX
              style={{ width: 350 - 30 }}
              textStyle={{ fontSize: 11, color: 'gray' }}
              dataSource={mockData}
              itemShowKey="label"
              itemCheckedKey="RNchecked"
              iconSize={18}
              iconColor={'#E85451'}
              // formHorizontal={true}
              labelHorizontal={true}
              onChecked={(item) => this._onSelect(item)}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => { }}>
              <Text style={styles.submitButton}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  section: {
    gap: 15,
    paddingBottom: 20,
  },
  heading: {
    fontWeight: '600',
  },
  buyAndRentContainer: {
    flexDirection: 'row',
    gap: 15,
    marginLeft: 5,
  },
  option: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 5,
    color: 'lightgray',
  },
  checkbox: {
    width: 320, // Adjust the width as needed
  },
  checkboxText: {
    fontSize: 11,
    color: 'gray',
  },
  submitButton: {
    textAlign: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#BFBEBE',
    color: 'white',
    overflow: 'hidden',
    fontWeight: '600',
  },
  dropdownStyling: {
    borderWidth: 1,
    paddingBottom: 10,
    borderColor: 'lightgray',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '100%',
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 }, // Adjust the height for the shadow
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 4,
  },
});