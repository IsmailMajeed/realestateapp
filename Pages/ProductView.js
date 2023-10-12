import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native';
import Product from '../Components/AllItemsPageComponents/Product';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeatureBox from '../Components/ProductViewPageComponents/FeatureBox';
import UserPortfolio from '../Components/ProductViewPageComponents/UserPortfolio';
import Map from '../Components/ProductViewPageComponents/Map';
import { ThemeContext } from '../Context/ThemeContext';
import SimilarProperty from '../Components/ProductViewPageComponents/SimilarProperty';
// import OpenAnything from 'react-native-openanything';
// import SendIntentAndroid from 'react-native-send-intent';


// import { Shadow } from 'react-native-shadow-2';

import { products } from '../Data/Data';
import { useNavigation } from '@react-navigation/native';
import ContactInfo from '../Components/ProductViewPageComponents/ContactInfo';
import CustomHeader from '../Components/CustomHeader';

export default function ProductView({ route }) {
  const { id } = route.params
  const product = products.find((item) => item.id === id)

  const [index, setIndex] = useState(0)
  const { theme } = useContext(ThemeContext)

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background }}>
      <CustomHeader />
      <View style={{ backgroundColor: 'white', paddingBottom: 140 }}>
        <View style={styles.bottomContainer}>
          <ContactInfo phoneNumber={product.phoneNumber} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Product product={product} border={0} clicked={() => {
            navigation.navigate('Gallary', { images: product.images });
          }} />
          <View style={styles.container}>
            <View>
              <Text style={styles.heading}>Condition</Text>
              <Text style={{ fontSize: 11, color: "gray" }}>{product.condition}</Text>
            </View>
            <View>
              <Text style={styles.heading}>Features</Text>
              <View style={styles.featureBox}>
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={1} />
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={0} />
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={0} />
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={1} />
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={0} />
                <FeatureBox title={'TV lounge'} iconName={'desktop-classic'} quantity={0} more={true} moreItems={8} />
              </View>
            </View>
            <Text style={styles.heading}>Location and nearby facilities</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: 'row', paddingBottom: 10, gap: 10 }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIndex(0)}
                  style={styles.optStyles}>
                  <MaterialCommunityIcons
                    name={'map-marker'}
                    color={index === 0 ? theme.primary : 'gray'}
                    size={21} />
                  <Text
                    style={[{ fontSize: 12, color: index === 0 ? theme.primary : 'gray' }]}>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIndex(1)}
                  style={styles.optStyles}>
                  <MaterialCommunityIcons
                    name={'school-outline'}
                    color={index === 1 ? theme.primary : 'gray'}
                    size={21} />
                  <Text
                    style={[{ fontSize: 12, color: index === 1 ? theme.primary : 'gray' }]}>
                    Schools
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIndex(2)}
                  style={styles.optStyles}>
                  <MaterialCommunityIcons
                    name={'stethoscope'}
                    color={index === 2 ? theme.primary : 'gray'}
                    size={21} />
                  <Text
                    style={[{ fontSize: 12, color: index === 2 ? theme.primary : 'gray' }]}>
                    Hospitals
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIndex(3)}
                  style={styles.optStyles}>
                  <MaterialCommunityIcons
                    name={'chef-hat'}
                    color={index === 3 ? theme.primary : 'gray'}
                    size={21} />
                  <Text
                    style={[{ fontSize: 12, color: index === 3 ? theme.primary : 'gray' }]}>
                    Resturants
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Map />
            <View style={{ gap: 10, marginTop: 10 }}>
              <Text style={styles.heading}>Published by</Text>
              <View>
                <UserPortfolio />
              </View>
            </View>
            <View>
              <TouchableOpacity
                // activeOpacity={1}
                // onPress={() => setIndex(3)}
                style={styles.optReport}
              >
                <MaterialCommunityIcons
                  name={'flag-variant'}
                  color={'#37474F'}
                  size={21} />
                <Text
                  style={[{ fontSize: 12, color: '#37474F' }]}>
                  REPORT THIS PROPERTY
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <SimilarProperty />
            </View>
          </View>
          {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        style={{ height: 250 }}
      >
        {product.images.map((image, index) => (
          <Image
            key={index} // Don't forget to add a unique key prop for each image
            source={{ uri: image }}
            style={{ width: width, height: 250, marginRight: 10 }} // Adjust width, height, and margin as needed
          />
        ))}
      </ScrollView>
      <View style>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Text style={{ fontWeight: '600' }}>PKR</Text>
          <Text style={{ fontWeight: '600', fontSize: 25 }}>{product.price}</Text>
        </View>
        <View>
          <View style={styles.redBox}>
          </View>
          <Text>
            {product.type}
          </Text>
        </View>
      </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '600'
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    gap: 10
  },
  bottomContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    // marginHorizontal: 20,
    gap: 10,
    position: 'absolute',
    bottom: 65,
    paddingVertical: 10,
    borderRadius: 15,
    // overflow: 'hidden',
    paddingHorizontal: 10,
    alignSelf: 'center',
    zIndex: 10,

    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,

    // ...Platform.select({
    //   ios: {

    //   },
    //   android: {
    //     // elevation: 0.0001, // Adjust the elevation value as needed
    //   },
    // }),
  },
  featureBox: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    flexWrap: 'wrap'
  },
  optStyles: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E5E5E5'
  },
  optReport: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
})