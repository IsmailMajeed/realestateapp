import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../Context/ThemeContext';

export default function WantedTabContent({ contents, icon = "home-outline", clicked, selected }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {
        contents.map((content) => (
          <TouchableOpacity
            key={content}
            onPress={() => clicked(content)}
            activeOpacity={1}
            style={[styles.textStyle, selected === content && { borderColor: theme.primary }]}
          >
            <MaterialCommunityIcons
              name={icon}
              color={'gray'}
              size={20} />
            <Text style={{ color: 'gray', fontSize: 11 }}>{content}</Text>
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
    borderRadius: 5,
    borderColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})