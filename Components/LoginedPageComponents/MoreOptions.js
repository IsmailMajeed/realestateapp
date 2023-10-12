import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../Context/ThemeContext';

export default function MoreOptions({ iconName, text, clicked }) {
  const { theme } = useContext(ThemeContext)

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => clicked()}>
        <MaterialCommunityIcons
          name={iconName}
          color={theme.text}
          size={17} />
        <Text style={{color: theme.text, fontSize: 12}}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  }
})