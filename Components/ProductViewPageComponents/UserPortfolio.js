import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function UserPortfolio() {
  const name = 'Ismail Majeed'
  const address = 'Address'
  const location = 'B-17'

  return (
    <View style={styles.container}>
      <View style={{width: 80, height: 80, backgroundColor: '#E5E5E5', borderRadius: 6}}>

      </View>
      <View style={{gap: 5}}>
        <Text style={{fontWeight: '600'}}>{name}</Text>
        <Text style={{fontWeight: '300', fontSize: 11, color: 'gray'}}>{address}</Text>
        <Text style={{fontWeight: '400'}}>{location}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    borderWidth: 1, 
    padding: 10,
    borderRadius: 6,
    borderColor: '#E5E5E5',
    gap: 10
  }
})