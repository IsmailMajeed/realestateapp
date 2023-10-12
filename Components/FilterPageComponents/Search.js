import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Search({ title, placeholder, showIcon = false, iconName = 'magnify', iconColor = 'gray', clicked, active = false }) {
  return (
    <View style={{ paddingHorizontal: 20, gap: 10 }}>
      <Text style={{ fontWeight: '600' }}>{title}</Text>
      <TouchableOpacity
        onPress={() => clicked()}
        activeOpacity={1}
      >
        <Text style={[styles.styledInput, { color: (!active && 'lightgray') }]} >{placeholder}</Text>
        {
          showIcon && (
            <MaterialCommunityIcons
              style={{ position: 'absolute', bottom: 10, right: 10 }}
              name={iconName}
              color={iconColor}
              size={25} />
          )
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  styledInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 15,
    fontSize: 12,
  },
})