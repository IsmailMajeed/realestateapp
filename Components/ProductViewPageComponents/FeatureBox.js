import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../Context/ThemeContext';

export default function FeatureBox({ iconName, title, quantity = 0, more = false, moreItems = 0 }) {
  const width = Dimensions.get('screen').width
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { width: width / 4, height: 100 }]}>
      {
        more ? (
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.primary, textAlign: 'center', borderWidth: 0, fontSize: 12, width: '95%' }}>
              +{moreItems} More Features
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <MaterialCommunityIcons
              name={iconName}
              color={'gray'}
              size={25} />
            <Text style={{ fontSize: 12, color: 'gray', textAlign: 'right' }}>
              {title}
              {
                quantity > 0 && (
                  <Text style={{ color: 'black' }}>
                    <Text style={{ color: 'gray' }}>: </Text>{quantity}
                  </Text>
                )
              }
            </Text>
          </>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    color: 'gray',
    // gap: 30,
    flexGrow: 1,
    padding: 10,
    borderRadius: 7,
    justifyContent: 'space-between'
  }
})