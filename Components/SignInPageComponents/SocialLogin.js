import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext';
import { Image } from 'expo-image';

export default function SocialLogin({ title, textColor, clicked, background = 'white', border = 1, link }) {
  const { theme } = useContext(ThemeContext)
  return (
    <View>
      <TouchableOpacity
        style={[styles.container, { borderWidth: border, backgroundColor: background }]}
        onPress={() => clicked()}
      >
        <Image
          source={{ uri: link }}
          style={styles.styledImage}
        />
        <Text style={{ color: textColor || theme.text, fontWeight: '500' }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 7,
    borderColor: '#CECECE'
  },
  styledImage: {
    borderWidth: 0,
    position: 'absolute',
    left: 25,
    width: 30,
    height: 30,
  }
})