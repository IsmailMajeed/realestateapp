import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Availibility = ({ setSelectedData }) => {
  const options = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selected, setSelected] = useState([])
  const handleSelect = (value) => {
    if (selected.includes(value)) {
      // If it's selected, remove it from the array
      setSelected(selected.filter((item) => item !== value));
      setSelectedData(selected.filter((item) => item !== value));
    } else {
      // If it's not selected, add it to the array
      setSelected([...selected, value]);
      setSelectedData([...selected, value]);
    }
  }
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View horizontal style={styles.container}>
        <TouchableOpacity onPress={() => {
          setSelected([])
          setSelectedData([])
        }} activeOpacity={1}>
          <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, paddingHorizontal: 20, borderColor: (selected.length > 0 ? 'lightgray' : '#E85451'), marginRight: 10 }}>Anytime</Text>
        </TouchableOpacity>
        {
          options.map((op) => (
            <TouchableOpacity key={op} onPress={() => handleSelect(op)} activeOpacity={1}>
              <Text style={{ borderWidth: 1, borderRadius: 20, padding: 10, paddingHorizontal: 20, borderColor: (selected.includes(op) ? '#E85451' : 'lightgray'), marginRight: 10 }}>{op}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

export default Availibility

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10
  }
})