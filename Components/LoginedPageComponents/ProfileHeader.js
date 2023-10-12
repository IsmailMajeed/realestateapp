import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Hr from '../Hr';
import { ThemeContext } from '../../Context/ThemeContext';
import { PREFIX, blurhash } from '../../Data/Constants';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileHeader({ username, image }) {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        {
          image ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Image View')}
            >
              <Image
                style={{ width: 70, height: 70, borderRadius: 35 }}
                source={(image[0] === 'f' ? '' : PREFIX) + image}
                placeholder={blurhash}
                contentFit="cover"
                transition={0}
              />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons
              name={'account-circle'}
              color={'lightgray'}
              size={60} />
          )
        }
        <Text style={{ fontWeight: '600', fontSize: 17, color: theme.text }}>{username}</Text>
      </View>
      <Hr />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    // borderWidth: 1
  }
})