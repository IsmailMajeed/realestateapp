import { View, Text, Linking, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext';
import MoreOptions from '../Components/LoginedPageComponents/MoreOptions';
import ProfileHeader from '../Components/LoginedPageComponents/ProfileHeader';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';

export default function LoginedPage() {
  const { theme } = useContext(ThemeContext)
  const { logOut } = useContext(UserContext);

  const height = Dimensions.get('screen').height;

  const url1 = 'https://www.graana.com/contact/';
  const url2 = 'https://www.graana.com/policy/';
  const url3 = 'https://www.graana.com/terms/';
  const navigate = useNavigation();

  const { userInfo } = useContext(UserContext);

  return (
    <View style={{ gap: 30, height: height - 100 }}>
      <View>
        <ProfileHeader image={userInfo?.profilePic || null} username={userInfo?.name || ''} />
      </View>
      <View style={{}}>
        <View style={{ gap: 25 }}>
          <MoreOptions clicked={() => {
            navigate.navigate('InvestNow')
          }} iconName={'chart-line'} text={'Invest'} />
          <MoreOptions clicked={() => {
            navigate.navigate('My Properties');
          }} iconName={'home-import-outline'} text={'My Properties'} />
          <MoreOptions clicked={() => {
            navigate.navigate('Liked')
          }} iconName={'heart-outline'} text={'Likes Properties'} />
          <MoreOptions clicked={() => {
            navigate.navigate('Profile')
          }} iconName={'cog-outline'} text={'Profile Settings'} />
          <MoreOptions clicked={() => {
            navigate.navigate('Contact us')
          }} iconName={'phone-in-talk-outline'} text={'Contact Us'} />
          <MoreOptions clicked={() => {
            Linking.openURL(url1)
              .then((supported) => {
                if (!supported) {
                  console.log('Cannot open URL on Mobile:', url1);
                } else {
                  console.log('Opened URL:', url1);
                }
              })
              .catch((err) => console.error('Error opening URL:', err));
          }} iconName={'comment-question-outline'} text={'FAQs'} />
          <MoreOptions clicked={() => {
            Linking.openURL(url2)
              .then((supported) => {
                if (!supported) {
                  console.log('Cannot open URL on Mobile:', url2);
                } else {
                  console.log('Opened URL:', url2);
                }
              })
              .catch((err) => console.error('Error opening URL:', err));
          }} iconName={'text-box-outline'} text={'Privacy Policy'} />
          <MoreOptions clicked={() => {
            Linking.openURL(url3)
              .then((supported) => {
                if (!supported) {
                  console.log('Cannot open URL on Mobile:', url3);
                } else {
                  console.log('Opened URL:', url3);
                }
              })
              .catch((err) => console.error('Error opening URL:', err));
          }} iconName={'view-list-outline'} text={'Terms and conditions'} />
          <MoreOptions clicked={() => {
            logOut()
          }} iconName={'logout'} text={'Sign out'} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('New Property')
        }}
        style={[styles.bottomBtn, { borderColor: theme.text, backgroundColor: theme.btn }]}>
        <Text style={{ fontSize: 12, color: theme.invertText, fontWeight: '500' }}>Add Property</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBtn: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 7,
    position: 'absolute',
    bottom: 40,
    zIndex: 1,
    alignSelf: 'center'
  }
})