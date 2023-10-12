import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Styles } from '../CommonStyling/Styles'
import { ThemeContext } from '../../Context/ThemeContext'

const DetailView = ({
  title,
  address,
  email = null,
  phoneNumber = null,
  active = true,
  odd = true,
  index = 0,
  changeActiveIndex = () => { }
}) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={{ gap: 5, backgroundColor: odd ? '#F5F5F5' : '#fff', padding: 20, paddingBottom: 10 }}>
      <Text style={Styles.heading}>{title}</Text>
      <View style={{
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons
          name='map-marker'
          color={theme.text}
          size={20}
        />
        <Text style={{ color: theme.text, fontSize: 12, borderWidth: 0, marginRight: 60 }}>{address}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        gap: 10,
        marginTop: 5
      }}>
        <TouchableOpacity onPress={() => changeActiveIndex(index)} style={[styles.btn, { borderColor: theme.btn, backgroundColor: active ? theme.btn : 'transparent' }]}>
          <Text style={{ color: active ? '#fff' : theme.text, fontSize: 12, fontWeight: '600' }}>View on Map</Text>
        </TouchableOpacity>
        {
          email && (
            <TouchableOpacity style={[styles.btn, { borderColor: theme.btn }]}>
              <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>Email</Text>
            </TouchableOpacity>
          )
        }
        {
          phoneNumber && (
            <TouchableOpacity onPress={() => {
              Linking.openURL(`tel:${phoneNumber}`);
            }} style={[styles.btn, { borderColor: theme.btn }]}>
              <Text style={{ color: theme.text, fontSize: 12, fontWeight: '600' }}>Call</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default DetailView

const styles = StyleSheet.create({
  btn: {
    width: 115,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center'
  }
})