import { View, Text, Dimensions } from 'react-native'
import React from 'react'
// import Carousel from 'react-native-swipeable-carousel';
import { SliderBox } from "react-native-image-slider-box";

const Swiper = ({ padding, images }) => {
  this.state = { images: images }
  const screenWidth = Dimensions.get('screen').width

  return (
    <View>
      <SliderBox
        // circleLoop={true}
        autoplay={true}
        imageLoadingColor='#E85451'
        inactiveDotColor='lightgray'
        paginationBoxStyle={{ width: 0, borderWidth: 0, position: 'relative', top: 0 }}
        dotStyle={{ width: 6, height: 6 }}
        activeOpacity={1}
        dotColor="#E85451"
        parentWidth={screenWidth - (padding * 2)}
        style={{ height: 250, borderRadius: 10, objectFit: 'contain' }}
        images={this.state.images} />
      {/* <Carousel
        height={250}
        images={images}
        enableGestureSwipe={true}
      /> */}
    </View>
  )
}

export default Swiper