import React, { useContext } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import { ThemeContext } from '../Context/ThemeContext';
import { Image } from 'expo-image';

const NOT_FOUND_IMAGE_URL = 'https://i.postimg.cc/VvjvFHWh/image-5.png';

const LikedPage = () => {
  const { width, height } = Dimensions.get('screen');
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title='Liked Properties' />
      <View style={styles.contentContainer}>
        <Image
          style={styles.image}
          source={{ uri: NOT_FOUND_IMAGE_URL }}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>No Liked Property</Text>
          <Text style={styles.description}>It appears you have not liked any property yet</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: Dimensions.get('screen').width / 1.8,
    height: Dimensions.get('screen').width / 1.8,
    borderRadius: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
    fontSize: 13,
    width: 200,
    textAlign: 'center',
  },
});

export default LikedPage;