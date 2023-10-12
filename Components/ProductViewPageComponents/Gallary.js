import React, { useState, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('screen');

const IMAGE_SIZE = 80;
const SPACING = 10;

const Gallary = ({ route }) => {
  const { images } = route.params;
  const topRef = useRef();
  const bottomRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActive = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      topRef?.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      });
      const scrollOffset = index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2;
      bottomRef?.current?.scrollToOffset({
        offset: Math.max(scrollOffset, 0),
        animated: true,
      });
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: height / 4 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', right: 10, top: 10 }}>
        <MaterialCommunityIcons name={'close'} color={'white'} size={25} />
      </TouchableOpacity>
      <FlatList
        ref={topRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          scrollToActive(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image source={{ uri: item }} style={{ width: width, height: 300 }} />
          </View>
        )}
      />
      <FlatList
        ref={bottomRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', bottom: IMAGE_SIZE, alignSelf: 'center' }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => scrollToActive(index)}>
            <Image
              source={{ uri: item }}
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 12,
                marginRight: SPACING,
                borderWidth: 2,
                borderColor: activeIndex === index ? 'white' : 'transparent',
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Gallary;