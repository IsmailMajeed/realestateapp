import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { FilterContext } from '../../Context/FiltersContext';
import { Image } from 'expo-image';

export default function DescriptiveComponent({ image, title, description, btn, isReverse, color, isCategory, navigate, isBuy }) {
  const navigation = useNavigation();
  const { setIsBuy } = useContext(FilterContext);
  return (
    <>
      <View style={[styles.styledContainer, (isReverse ? styles.reverse : ''), { backgroundColor: color }]}>
        <Image
          contentFit='contain'
          style={styles.styledImage}
          source={{ uri: image }}
        />
        <View style={styles.StyledDesContainer}>
          <Text style={styles.styledTitle}>
            {title}
          </Text>
          <Text numberOfLines={3} style={styles.styledDescription}>
            {description}
          </Text>
          <Button
            onPress={() => {
              setIsBuy(isBuy);
              navigation.navigate(navigate);
            }}
            style={[styles.styledButton, !isCategory ? { backgroundColor: '#37474F' } : '']}>
            <Text style={[{ color: 'white', fontSize: 12, fontWeight: 700 }, (isCategory ? { color: '#37474F' } : '')]}>
              {btn}
            </Text>
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  styledContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    zIndex: -1,
    paddingHorizontal: 35,
    paddingVertical: 30,
    // fontFamily: 'Poppins',
    gap: 20,
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  StyledDesContainer: {
    flex: 1,
    textAlign: 'left',
    height: 143,
    gap: 5,
    paddingTop: 20,
  },
  styledTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  styledDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: 'gray',
  },
  styledButton: {
    borderColor: '#37474F',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 'auto'
  },
  styledImage: {
    width: 175,
    height: 143,
  },
})