import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-web-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 250,
  },
  slideContainer: {
    flex: 0,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },
});

const ImageCarousel = ({ images, clicked }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  // Function to handle clicking on an image
  const handleImageClick = () => {
    if (!isScrolling) {
      clicked()
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        onScrollBeginDrag={() => setIsScrolling(true)}
        onMomentumScrollEnd={() => setIsScrolling(false)}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleImageClick}
            key={index}
            style={[styles.slideContainer]}
          >
            <Image
              style={{ height: 250, width: '100%' }}
              source={{ uri: image }}
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageCarousel;