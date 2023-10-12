import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { Styles } from '../CommonStyling/Styles';

const COMMON_COLOR = '#E9E7E7';
const COMMON_RADIUS = 10;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: COMMON_COLOR,
    borderRadius: COMMON_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: COMMON_RADIUS,
    backgroundColor: COMMON_COLOR,
    objectFit: 'contain'
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default function Listings({ listings }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ paddingVertical: 10, gap: 10 }}>
      <Text style={Styles.heading}>Listings</Text>
      <View style={{ gap: 10 }}>
        {listings &&
          listings.map((listing, index) => (
            <TouchableOpacity key={index} style={styles.container}>
              <Image
                style={styles.image}
                source={{ uri: listing.image }}
              />
              <View style={styles.infoContainer}>
                <Text style={[styles.title, { color: theme.text }]}>{listing.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={[styles.priceText, { color: theme.text }]}>PKR</Text>
                  <Text style={{ ...styles.title, color: theme.primary }}>{listing.price}</Text>
                </View>
                <Text numberOfLines={2}>{listing.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}
