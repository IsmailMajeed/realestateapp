import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContactInfo({ phoneNumber }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${phoneNumber}`);
        }}
        style={[styles.commonStyling, { borderWidth: 1, borderColor: '#37474F' }]}>
        <MaterialCommunityIcons
          name={'phone-in-talk-outline'}
          color={'#37474F'}
          size={23} />
        <Text style={{ color: '#37474F', fontWeight: '500', fontSize: 12 }}>
          CALL
        </Text>
      </TouchableOpacity>
      <View style={[styles.commonStyling, { backgroundColor: '#37474F' }]}>
        <MaterialCommunityIcons
          name={'email-outline'}
          color={'white'}
          size={23} />
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>
          INQUIRE
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('whatsapp://send?text=' + 'Hello' + '&phone=' + phoneNumber);
        }}>
        <MaterialCommunityIcons
          style={[styles.commonStyling, { backgroundColor: '#25D366' }]}
          name={'whatsapp'}
          color={'white'}
          size={23} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  commonStyling: {
    paddingHorizontal: 30,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
})