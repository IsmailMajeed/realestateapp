import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import { RadioButton } from 'react-native-paper';
import CustomHeader from '../Components/CustomHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputBox from '../Components/WantedPageComponents/InputBox';
import IntlPhoneField from 'react-native-intl-phone-field';
import { Styles } from '../Components/CommonStyling/Styles';

import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

// import FastImage from 'react-native-fast-image'
// import ImageModal from 'react-native-image-modal';
import { Image } from 'expo-image';

import { PREFIX, blurhash } from '../Data/Constants';

const PADDING = 20;
const { width, height } = Dimensions.get('screen')

export default function Profile({ navigation }) {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext)
  const [selectedValue, setSelectedValue] = useState(isDarkMode ? 'Dark Mode' : 'Light Mode');
  const [showPreferences, setShowPreferences] = useState(false);

  const { userInfo, setUserData } = useContext(UserContext);

  const [name, setName] = useState(userInfo?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [city, setCity] = useState(userInfo?.city || '');

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const [image, setImage] = useState(userInfo?.profilePic || null)

  const handleDocumentSelection = async () => {
    // Request gallery permissions only when needed
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access media library denied');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [16, 9],
        // quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      // Handle any errors here
      console.error(err);
    }
  };

  const [isLoading, setIsLoading] = useState(false)
  const updateProfile = () => {
    const data = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      city: city
    }
    const formData = new FormData();
    if (image)
      formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg'
      });
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('email', data.email);
    formData.append('city', data.city);
    setIsLoading(true)
    axios.put(`/user/update/${userInfo.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => {
        console.log(res.data)
        setUserData(userInfo.id, name, phoneNumber, email, city, image)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }
  state = {
    spinner: isLoading
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <CustomHeader />
      {
        isLoading && (
          <Spinner
            color={theme.primary}
            visible={this.state.spinner}
          // textContent={'Loading...'}
          // textStyle={styles.spinnerTextStyle}
          />
        )
      }
      <ScrollView contentContainerStyle={{ flex: 1, borderWidth: 0 }}>
        <View style={{ backgroundColor: theme.background }}>
          <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.background }]}
            onPress={() => setShowPreferences(!showPreferences)} // Call toggleTheme when pressed
          >
            <Text style={[styles.text, { color: theme.text }]}>Preferences</Text>
          </TouchableOpacity>
          <View style={showPreferences ? '' : { display: 'none' }}>
            <RadioButton.Group
              onValueChange={(value) => {
                toggleTheme(value)
                handleRadioButtonChange(value)
              }
              }
              value={selectedValue}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item labelStyle={[{ color: theme.text }]} label="Dark Mode" value="Dark Mode" />
                <RadioButton.Item labelStyle={[{ color: theme.text }]} label="Light Mode" value="Light Mode" />
                {/* <RadioButton.Item label="Option 3" value="option3" /> */}
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={{ paddingHorizontal: PADDING }}>
          <TouchableOpacity onPress={handleDocumentSelection} style={styles.profileContainer}>
            {
              image ? (
                <>
                  {/* <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor="#ccc"
                    style={{
                      width: 90,
                      height: 90,
                    }}
                    source={{
                      uri: (image[0] === 'f' ? '' : PREFIX) + image
                    }}
                  /> */}
                  {/* <FastImage
                    style={{ width: 90, height: 90 }}
                    source={{
                      uri: (image[0] === 'f' ? '' : PREFIX) + image,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  /> */}
                  {/* <Image
                    source={{ uri: (image[0] === 'f' ? '' : PREFIX) + image }}
                    style={{
                      width: 90,
                      height: 90,
                    }}
                  /> */}
                  <Image
                    style={{ width: 90, height: 90 }}
                    source={(image[0] === 'f' ? '' : PREFIX) + image}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={0}
                  />
                </>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name='account'
                    color='#fff'
                    size={45}
                  />
                  <Text style={styles.uploadPhotoStyle}>UPLOAD PHOTO</Text>
                </>
              )
            }
          </TouchableOpacity>

          <View style={{ gap: 20 }}>
            <InputBox label={'Name'} value={name} onChangeText={(text) => setName(text)} />

            <View>
              <IntlPhoneField
                defaultValue={phoneNumber}
                onEndEditing={(result) => { setPhoneNumber(result.value) }}
                // onValidation={(isValid) => console.log(isValid)}
                defaultCountry="PK"
                defaultPrefix="+92"
                defaultFlag="🇵🇰"
                containerStyle={Styles.inputStyling}
              />
              <Text style={[styles.inputBelow, { color: 'gray', fontSize: 11 }]}>Changing phone number require OTP verification</Text>
            </View>

            <View>
              <InputBox label={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
              <Text style={styles.inputBelow}>Optional</Text>
            </View>

            <View>
              <InputBox showIcon={true} iconName='magnify' iconColor='gray' label={'City'} value={city} onChangeText={(text) => setCity(text)} />
              <Text style={styles.inputBelow}>Optional</Text>
            </View>

          </View>
        </View>

        <TouchableOpacity onPress={updateProfile} style={styles.saveBtnLocation}>
          <Text style={[styles.saveBtn, { color: theme.invertText, backgroundColor: theme.btn }]}>SAVE</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    // flex: 1,
    flexDirection: 'column',
  },
  inputBelow: {
    // position: 'absolute',
    color: 'lightgray',
    fontSize: 10,
    marginTop: 5
  },
  profileContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden'
  },
  saveBtn: {
    textAlign: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: width - PADDING * 2,
    fontWeight: 'bold'
  },
  saveBtnLocation: {
    position: 'absolute',
    bottom: 0
  },
  uploadPhotoStyle: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    width: 60
  }
});