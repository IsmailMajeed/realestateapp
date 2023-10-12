import React, { useContext, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import NewProperty from './NewProperty';
import { ThemeContext } from '../Context/ThemeContext';
// import faker from 'faker';

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const IMG_URL = 'https://i.postimg.cc/R0ZSFP0S/image-2.png';

function AddProperty() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const zIndex = imageOpacity.interpolate({
    inputRange: [-9, 1],
    outputRange: [-10, 0], // Change zIndex when opacity goes from 1 to 0
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  // const titleScale = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //   outputRange: [1, 1, 0.9],
  //   extrapolate: 'clamp',
  // });
  // const titleTranslateY = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //   outputRange: [0, 0, -8],
  //   extrapolate: 'clamp',
  // });

  const { theme } = useContext(ThemeContext);
  const [bgColor, setBgColor] = useState(theme.primary);
  return (
    <>
      <SafeAreaView style={styles.saveArea}>
        {/* <View style={{ zIndex: 0 }}> */}
        <CustomHeader border={0} />
        {/* </View> */}
        <Animated.View
          style={[styles.header, {
            transform: [{ translateY: headerTranslateY }],
            opacity: imageOpacity,
            zIndex: zIndex
          }]}>
          <CustomHeader border={0} />
          <Animated.Image
            style={[
              styles.headerBackground(bgColor),
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslateY }],
              },
            ]}
            source={{ uri: IMG_URL }}
            onLoad={() => setBgColor('#fff')}
          // onLoad={setBgColor('#fff')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.topBar,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
              // transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
            },
          ]}>
          <Text style={styles.heading}>Upload your Property</Text>
          <Text style={styles.headingBelow}>Get the best value for your property in few steps</Text>
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}>
          <NewProperty />
        </Animated.ScrollView>

      </SafeAreaView>

      <View style={{
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 30,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
        <Text style={{ fontWeight: '600', color: theme.text, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>SAVE DRAFT</Text>
        <Text style={{ fontWeight: '600', color: theme.invertText, backgroundColor: theme.btn, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, overflow: 'hidden' }}>PUBLISH</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E85451',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: (bg) => ({
    position: bg === '#fff' ? 'absolute' : 'relative',
    // top: 0,
    left: '73%',
    // right: 0,
    width: 113,
    // objectFit: 'contain',
    // width: null,
    backgroundColor: bg,
    // borderWidth: 1,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  }),
  topBar: {
    marginTop: 20,
    // height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: HEADER_MAX_HEIGHT,
    paddingLeft: 20,
    // borderWidth: 1,
    gap: 10,
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
  },
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
});

export default AddProperty;