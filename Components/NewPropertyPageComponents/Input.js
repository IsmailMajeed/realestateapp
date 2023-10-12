import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../Context/ThemeContext';

const width = Dimensions.get('screen').width

const Input = ({
  placeholder,
  iconName = 'magnify',
  iconSize = 25,
  iconColor = 'gray',
  position = 'left',
  clicked = () => { },
  editable = true,
  value = '',
  onChangeText = () => { }
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity style={{
      borderWidth: 1,
      borderColor: '#e1e1e1',
      borderRadius: 5,
    }} onPress={() => clicked()}>
      {
        !editable ?
          value ? (
            <Text style={[styles.inputStyling(theme.text), (position !== 'left' && { paddingHorizontal: 10 })]}>{value}</Text>
          ) : (
            <Text style={[styles.inputStyling(), (position !== 'left' && { paddingHorizontal: 10 })]}>{placeholder}</Text>
          )
          : (
            <TextInput
              value={value}
              style={[styles.inputStyling(), position !== 'left' && { paddingHorizontal: 10, }]}
              placeholder={placeholder}
              editable={editable}
              onChangeText={(text) => onChangeText(text)}
              onTouchStart={() => { }}
            // onPressOut={() => clicked()}
            />
          )
      }
      <MaterialCommunityIcons
        style={[{
          position: 'absolute',
          paddingVertical: 11,
          // right: 10,
          left: position === 'left' ? 10 : width - (10 * 8),
          // borderWidth: 1
        }]}
        name={iconName}
        color={iconColor}
        size={iconSize} />
    </TouchableOpacity>
  )
}

export default Input

const styles = StyleSheet.create({
  inputStyling: (color = 'lightgray') => ({
    // borderWidth: 1,
    // borderColor: '#e1e1e1',
    paddingHorizontal: 50,
    paddingVertical: 15,
    color: color
    // borderRadius: 5,
  })
})