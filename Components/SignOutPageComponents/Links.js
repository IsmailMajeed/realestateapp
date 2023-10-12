import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Links({ text, clicked }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        onPress={() => clicked()}>
        <Text style={{ color: theme.text, fontSize: 12 }}>{text}</Text>
        <MaterialCommunityIcons
          name={'chevron-right'}
          color={theme.primary}
          size={20} />
      </TouchableOpacity>
    </View>
  )
}