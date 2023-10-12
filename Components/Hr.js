import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function Hr() {
  return (
    <View style={styles.hr}>
    </View>
  )
}

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    width: '100%'
  }
})