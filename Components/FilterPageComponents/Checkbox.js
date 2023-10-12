import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function Checkbox({ title, options, any = true, padding = 20, setValue = () => { } }) {
  const [selected, setSelected] = useState([])
  const handleSelect = (value) => {
    if (any) {
      if (selected.includes(value)) {
        // If it's selected, remove it from the array
        setSelected(selected.filter((item) => item !== value));
      } else {
        // If it's not selected, add it to the array
        setSelected([...selected, value]);
      }
    } else {
      setSelected([value])
      setValue(value)
    }
  }
  return (
    <View style={{ paddingHorizontal: padding }}>
      <Text style={{ fontWeight: '600' }}>{title}</Text>
      <ScrollView indicatorStyle='white' horizontal style={{ paddingVertical: 10 }}>
        {
          any && (
            <TouchableOpacity onPress={() => setSelected([])} activeOpacity={1}>
              <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, paddingHorizontal: 20, borderColor: (selected.length > 0 ? 'lightgray' : '#E85451'), marginRight: 10 }}>Any</Text>
            </TouchableOpacity>
          )
        }
        {
          options.map((op) => (
            <TouchableOpacity key={op} onPress={() => handleSelect(op)} activeOpacity={1}>
              <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, paddingHorizontal: 20, borderColor: (selected.includes(op) ? '#E85451' : 'lightgray'), marginRight: 10 }}>{op}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//   }
// })