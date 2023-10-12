import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-web-switch'

export default function SwitchComponent({ title, desc }) {
  const [switchValue, setSwitchValue] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: 600 }}>{title}</Text>
        <Text style={{ fontWeight: 200, fontSize: 12 }}>{desc}</Text>
      </View>
      <Switch
        value={switchValue} onChange={() => setSwitchValue(!switchValue)} />
    </View>
  )
}
const styles = StyleSheet.create({
  textContainer: {
    gap: 10,
  },
  container: {
    paddingHorizontal: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})