import { View, Text, TouchableOpacity, StyleSheet, TextInput, NativeModules, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../Components/CommonStyling/Styles';
import DropdownOpt from '../Components/WantedPageComponents/DropdownOpt';
import Input from '../Components/NewPropertyPageComponents/Input';
import Checkbox from '../Components/FilterPageComponents/Checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IntlPhoneField from 'react-native-intl-phone-field';
import { Switch } from 'react-native-web-switch';
import Availibility from '../Components/NewPropertyPageComponents/Availibility';
import SliderOpt from '../Components/WantedPageComponents/SliderOpt';
import { cities, conditions, sizes } from '../Data/Data';
import { Image } from 'expo-image';
import BottomSheetOpt from '../Components/NewPropertyPageComponents/BottomSheetOpt';
// import BottomSheetEX from '../Components/BottomSheet';
import * as ImagePicker from 'expo-image-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
// import * as DocumentPicker from 'expo-document-picker'; 

const SELL_IMG = 'https://i.postimg.cc/Pq77Bs2w/image-3.png';
const RENT_IMG = 'https://i.postimg.cc/qqV5vcfB/image-4.png';


const { width, height } = Dimensions.get('screen')
let defaultOptions = {
  //**iOS**//
  usedPrefetch: false,
  allowedAlbumCloudShared: false,
  muteAudio: true,
  autoPlay: true,
  //resize thumbnail
  haveThumbnail: true,

  thumbnailWidth: Math.round(width / 2),
  thumbnailHeight: Math.round(height / 2),
  allowedLivePhotos: true,
  preventAutomaticLimitedAccessAlert: true, // newest iOS 14
  emptyMessage: 'No albums',
  selectMessage: 'Select',
  deselectMessage: 'Deselect',
  selectedColor: '#FB9300',
  maximumMessageTitle: 'Notification',
  maximumMessage: 'You have selected the maximum number of media allowed',
  maximumVideoMessage: 'You have selected the maximum number of video allowed',
  messageTitleButton: 'OK',
  cancelTitle: 'Cancel',
  tapHereToChange: 'Tap here to change',

  //****//

  //**Android**//

  //****//

  //**Both**//
  usedCameraButton: true,
  allowedVideo: true,
  allowedPhotograph: true, // for camera : allow this option when you want to take a photos
  allowedVideoRecording: false, //for camera : allow this option when you want to recording video.
  maxVideoDuration: 60, //for camera : max video recording duration
  numberOfColumn: 3,
  maxSelectedAssets: 20,
  doneTitle: 'Done',
  isPreview: true,
  mediaType: 'all',
  isExportThumbnail: false,
  maxVideo: 20,
  selectedAssets: [],
  singleSelectedMode: false,
  isCrop: false,
  isCropCircle: false,
};

export default function NewProperty({ route }) {
  const { theme } = useContext(ThemeContext)
  const [isBuy, setIsBuy] = useState(true)

  const [kindType, setKindType] = useState('Residential')
  const [kind, setKind] = useState('House')

  const [city, setCity] = useState('')
  const [area, setArea] = useState(route?.params?.selectedArea || '')

  const [size, setSize] = useState(0)
  const [sizeType, setSizeType] = useState(sizes[3])
  const [price, setPrice] = useState(0)

  const [bedroom, setBedroom] = useState(null)
  const [bathroom, setBathroom] = useState(null)

  const [name, setName] = useState('')
  const [condition, setCondition] = useState('')

  const [showSlider, setShowSlider] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showSizeBottomSheet, setSizeShowBottomSheet] = useState(false)

  const [isAvailable, setIsAvailable] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null);


  const handleDocumentSelection = async () => {
    const options = {
      ...defaultOptions,
      // ...optionsPicker,
    };

    try {
      const response = await NativeModules.MultipleImagePicker.openPicker(
        options
      );
      if (response?.length) {
        if (isSingle) {
          console.log((response[0]));
          // resolve(response[0]);
        }
        console.log((response));
        // resolve(response);
        return;
      }
      // resolve([]);
    } catch (e) {
      console.log(e);
      // reject(e);
    }
    // // Request gallery permissions only when needed
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   console.error('Permission to access media library denied');
    //   return;
    // }

    // try {
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     // aspect: [16, 9],
    //     // quality: 15,
    //   });

    //   console.log(result);

    //   if (!result.canceled) {
    //     setSelectedImage(result.assets[0].uri);
    //   }
    // } catch (err) {
    //   // Handle any errors here
    //   console.error(err);
    // }
  };

  // const [fileResponse, setFileResponse] = useState([]);

  // const handleDocumentSelection = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync(); // Use Expo's method
  //     if (!result.canceled) {
  //       setFileResponse(result);
  //       console.log(result);
  //     } else {
  //       console.log(result);
  //       // Handle the case where the user cancels or there's an error
  //     }
  //   } catch (err) {
  //     // Handle any errors here
  //     console.error(err);
  //   }
  // };

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: '#fff', marginBottom: 60 }}>
      {/* <BottomSheetEX /> */}
      <View style={{
        paddingHorizontal: 20,
        gap: 10,
        marginVertical: 10,
      }}>

        <View>
          <Text style={Styles.heading}>What do you want to do?</Text>
          <View style={{
            flexDirection: 'row',
            gap: 10, padding: 10
          }}>
            <TouchableOpacity
              style={[styles.btn, isBuy && { borderColor: theme.primary }]}
              onPress={() => setIsBuy(true)}
            >
              <Image
                contentFit='contain'
                source={{ uri: SELL_IMG }}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, !isBuy && { borderColor: theme.primary }]}
              onPress={() => setIsBuy(false)}
            >
              <Image
                contentFit='contain'
                source={{ uri: RENT_IMG }}
                style={{
                  width: 20,
                  height: 20,
                  objectFit: 'contain'
                }}
              />
              <Text>Rent</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={[Styles.heading, { paddingHorizontal: 20 }]}>What kind of property do you have?</Text>
        <DropdownOpt kind={kind} kindType={kindType} px={10} clicked={(key, value) => {
          setKindType(key)
          setKind(value)
        }} />
      </View>

      <View style={{
        paddingHorizontal: 20,
        gap: 20,
      }}>
        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>Which city is your property in?</Text>
          <Input value={city} clicked={() => setShowSlider(true)} editable={false} placeholder={'Search City'} />

          {
            showSlider && (
              <SliderOpt title={'Select City'}
                value={city}
                onClose={(city) => {
                  setShowSlider(false)
                  setCity(city)
                  setArea('')
                }
                }
                cities={cities}
                show={showSlider}
              />
            )
          }
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>Which area is your property in?</Text>
          <Input value={area} clicked={() => {
            if (city)
              navigation.navigate('Select Page', { city: city, setItem: (item) => setArea(item) })
          }} editable={false} placeholder={'Search area within a city'} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>What is the size of your property?</Text>
          <View style={styles.inputStyle}>
            <TextInput value={size} onChangeText={(text) => setSize(text)} keyboardType='numeric' placeholder='0' />
            <TouchableOpacity
              onPress={() => setSizeShowBottomSheet(true)}
              style={{
                position: 'absolute',
                right: 10,
                top: 7,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Text style={{ color: theme.text, fontWeight: '500', fontSize: 13 }}>{sizeType}</Text>
              <MaterialCommunityIcons
                name='chevron-down'
                color={theme.primary}
                size={25}
              />
            </TouchableOpacity>
            <BottomSheetOpt contents={sizes} title='Pick Size Unit' show={showSizeBottomSheet} onClose={(text) => {
              setSizeShowBottomSheet(false)
              if (text)
                setSizeType(text || '')
            }
            } />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>What is the asking price?</Text>
          <View style={styles.inputStyle}>
            <TextInput value={price} onChangeText={(text) => setPrice(text)} keyboardType='numeric' placeholder='0' />
            <Text
              style={{
                position: 'absolute',
                right: 10,
                color: theme.primary,
                fontSize: 12,
                fontWeight: '700',
                paddingVertical: 10,
              }}
            >PKR</Text>
          </View>
        </View>

        <Checkbox setValue={(val) => setBedroom(val)} padding={0} title={'How many bedrooms does it have?'} options={[
          'studio', 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'
        ]} any={false} />

        <Checkbox setValue={(val) => setBathroom(val)} padding={0} title={'How many bathrooms does it have?'} options={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'
        ]} any={false} />

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>Name your property</Text>
          <Input onChangeText={(text) => setName(text)} value={name} position='right' iconName='pencil' iconColor={theme.primary} editable={true} placeholder={'Name your property'} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>What is the condition your property</Text>
          <Input clicked={() => setShowBottomSheet(true)} value={condition} position='right' iconName='chevron-down' iconColor={theme.primary} editable={false} placeholder={'Select the condition'} />
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>What amentities are available?</Text>
          <Text style={styles.belowHeaderTextStyle}>Add additional features e.g balcony, utilities, security details etc</Text>

          <TouchableOpacity onPress={() => {
            navigation.navigate('Add Features')
          }}>
            <Text style={{
              marginVertical: 5,
              color: theme.primary,
              fontSize: 17,
              fontWeight: '600'
            }}>+ &nbsp;&nbsp;ADD FEATURES</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>What do you love about this place?</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            // onChangeText={(newText) => setText(newText)}
            // value={text}
            placeholder="Describe your property in detail..."
          />
        </View>

        {/* upload image session */}
        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>Upload Images of your property</Text>
          <View>
            <Text style={styles.belowHeaderTextStyle}>Properties with images of good quality</Text>
            <Text style={styles.belowHeaderTextStyle}>generate 8x more leads</Text>
            <Text style={styles.belowHeaderTextStyle}>Support file formate: png, jpeg, heic</Text>
          </View>

          <TouchableOpacity
            onPress={handleDocumentSelection}
            style={[styles.uploadBtn, { borderColor: theme.btn }]}>
            <MaterialCommunityIcons
              name={'upload'}
              color={theme.primary}
              size={25} />
            <Text style={{ fontSize: 13, color: theme.text, fontWeight: '600' }}>UPLOAD IMAGES</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={Styles.heading}>Tell us how to contact you</Text>
          <IntlPhoneField
            // onEndEditing={(result) => console.log(result)}
            // onValidation={(isValid) => console.log(isValid)}
            defaultCountry="PK"
            defaultPrefix="+92"
            defaultFlag="🇵🇰"
            containerStyle={Styles.inputStyling}
          />
        </View>

        <View style={{ gap: 0 }}>
          <Text style={Styles.heading}>Specify Avaiability?</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={styles.belowHeaderTextStyle}>Let us know when you are avaiabile for site visits</Text>
            <Switch
              value={isAvailable} onChange={() => setIsAvailable(!isAvailable)} />
          </View>
        </View>

        {
          isAvailable && (
            <View style={{ gap: 10 }}>
              <Text style={Styles.heading}>When can client visit your property?</Text>
              <Availibility />
            </View>
          )
        }
      </View>
      <BottomSheetOpt contents={conditions} title='Select the condition' show={showBottomSheet} onClose={(text) => {
        setShowBottomSheet(false)
        if (text)
          setCondition(text || '')
      }
      } />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: "#fff",
    fontWeight: '700'
  },
  headingBelow: {
    color: '#fff',
    width: 200,
    fontWeight: '500'
  },
  btn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    borderColor: '#e1e1e1',
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center'
  },
  inputStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5
  },
  textInput: {
    borderColor: '#e1e1e1',
    borderWidth: 1,
    height: 100,
    padding: 10,
    // fontSize: 16,
    // padding: 10,
    borderRadius: 5,
  },
  belowHeaderTextStyle: {
    fontSize: 12,
    color: 'gray'
  },
  uploadBtn: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  }
})