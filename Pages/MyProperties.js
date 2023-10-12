import React, { useContext, useRef, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';
import Hr from '../Components/Hr';
import { ThemeContext } from '../Context/ThemeContext';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('screen');
const TAB_SIZE = 80;
const NOT_FOUND_IMAGE_URL = 'https://i.postimg.cc/VvjvFHWh/image-5.png';

const MyProperty = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const topRef = useRef();
  const bottomRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActive = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      const offset = index * width;
      topRef?.current?.scrollToOffset({
        offset,
        animated: true
      });

      const bottomOffset = index * (TAB_SIZE * 1.5) - width / 2 + (TAB_SIZE * 1.5) / 2;
      bottomRef?.current?.scrollToOffset({
        offset: bottomOffset > 0 ? bottomOffset : 0,
        animated: true
      });
    }
  };

  const data = [
    { title: 'Draft', content: 'Content1' },
    { title: 'Active', content: 'Content2' },
    { title: 'Pending', content: 'Content3' },
    { title: 'Removed', content: 'Content4' },
    { title: 'Rejected', content: 'Content5' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader />
      <FlatList
        ref={bottomRef}
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              borderBottomWidth: activeIndex === index ? 2 : 0,
              borderColor: theme.primary,
              width: TAB_SIZE * 1.5,
              alignItems: 'center',
            }}
            onPress={() => scrollToActive(index)}
          >
            <Text style={{
              paddingVertical: 15,
              color: theme.text,
              fontSize: 13
            }}>{item.title}(0)</Text>
          </TouchableOpacity>
        )}
      />
      <Hr />
      <FlatList
        ref={topRef}
        data={data}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActive(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => (
          <View style={{
            width: width,
            height: height,
            alignItems: 'center',
            gap: 10,
          }}>
            <Image
              style={{
                width: width / 2,
                height: width / 2,
                borderRadius: 15,
                marginTop: TAB_SIZE * 2
              }}
              source={{ uri: NOT_FOUND_IMAGE_URL }}
            />
            <View style={{
              alignItems: 'center',
              gap: 5
            }}>
              <Text style={{
                color: theme.text,
                fontSize: 22,
                fontWeight: 'bold'
              }}>No Property Found</Text>
              <Text style={{
                color: 'gray',
                fontSize: 13
              }}>None of your properties are currently published</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MyProperty;