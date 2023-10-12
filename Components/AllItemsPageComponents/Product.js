import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Carousel from 'react-native-swipeable-carousel';
import { SliderBox } from "react-native-image-slider-box";

// import ImageCarousel from './ImageCaruosel';

const Product = ({ product, clicked, padding = 0, border = 1 }) => {
  const screenWidth = Dimensions.get('window').width;

  this.state = { images: product.images }
  return (
    <View style={{ backgroundColor: 'white', borderWidth: border, borderColor: '#F7F2F1', borderRadius: 5, width: screenWidth - (padding * 2), marginBottom: 0, overflow: 'hidden' }}>
      <View style={{ width: screenWidth - (padding * 2) }}>
        <TouchableOpacity
          onPress={() => clicked()}
          activeOpacity={1}
        >
          {/* <Carousel
            images={product.images}
            enableGestureSwipe={true}
            height={250}
          /> */}
        </TouchableOpacity>
        {/* <ImageCarousel clicked={clicked} id={product.id} images={product.images} /> */}
        <View style={{ backgroundColor: '#363636' }}>
          <SliderBox
            // autoplay={true}
            imageLoadingColor='#E85451'
            paginationBoxStyle={{ width: 0 }}
            dotStyle={{ width: 6, height: 6 }}
            onCurrentImagePressed={() => clicked()}
            activeOpacity={1}
            dotColor="#E85451"
            parentWidth={screenWidth - (padding * 2)}
            style={styles.styledImage}
            images={this.state.images} />
        </View>

        <MaterialCommunityIcons
          style={styles.styledIcon}
          name="heart-outline"
          color={'white'}
          size={25} />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => clicked()}
        style={{ gap: 5, padding: 15, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold' }}>PKR</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 3, }}>{product.price}</Text>
          <View style={{ flex: 1, alignItems: 'center', gap: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.box}></View>
            <Text style={{ color: 'gray' }}>{product.type}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 15, }}>
          <View style={{ flexDirection: 'row', gap: 5, }}>
            <MaterialCommunityIcons
              name="bed-king-outline"
              color={'black'}
              size={20} />
            <Text>{product.rooms}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, }}>
            <MaterialCommunityIcons
              name="shower"
              color={'black'}
              size={20} />
            <Text>{product.washrooms}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <MaterialCommunityIcons
              style={{ borderWidth: 1, borderRadius: 5, padding: 1 }}
              name="arrow-expand"
              color={'black'}
              size={15} />
            <Text style={{ paddingTop: 1 }}>{product.area} Sqft</Text>
          </View>
        </View>
        <Text>{product.location}</Text>
        <Text>{product.uploadTime}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  styledImage: {
    height: 250,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  styledIcon: {
    position: 'absolute',
    color: 'white',
    right: 15,
    bottom: 15,
  },
  box: {
    width: 10,
    height: 10,
    backgroundColor: '#E85451'
  }
})

export default Product;