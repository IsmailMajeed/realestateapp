import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabContent({ contents, icon = "home-outline" }) {
  const [selected, setSelected] = useState([]);
  const handleSelect = (value) => {
    if (selected.includes(value)) {
      // If it's selected, remove it from the array
      setSelected(selected.filter((item) => item !== value));
    } else {
      // If it's not selected, add it to the array
      setSelected([...selected, value]);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSelected([])}
        activeOpacity={1}
        style={[styles.textStyle, { borderColor: (selected.length === 0) ? '#E85451' : 'lightgray' }]}
      >
        <MaterialCommunityIcons
          name={'apps'}
          color={'gray'}
          size={25} />
        <Text>Any</Text>
      </TouchableOpacity>
      {
        contents.map((content) => (
          <TouchableOpacity
            key={content}
            onPress={() => handleSelect(content)}
            activeOpacity={1}
            style={[styles.textStyle, { borderColor: (selected.includes(content)) ? '#E85451' : 'lightgray' }]}
          >
            <MaterialCommunityIcons
              name={icon}
              color={'gray'}
              size={25} />
            <Text style={{ color: 'gray' }}>{content}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    flexWrap: 'wrap'
  },
  textStyle: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    borderColor: 'lightgray',
    fontSize: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})