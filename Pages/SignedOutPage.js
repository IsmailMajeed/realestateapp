import { View, Dimensions, Linking } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext';
import Links from '../Components/SignOutPageComponents/Links';
import SignInHeader from '../Components/SignOutPageComponents/SignInHeader';

export default function SignedOutPage() {
  const { theme } = useContext(ThemeContext)
  const height = Dimensions.get('screen').height;

  const url1 = 'https://www.graana.com/contact/';
  const url2 = 'https://www.graana.com/policy/';
  const url3 = 'https://www.graana.com/terms/';
  return (
    <View style={{ height: height - 100 }}>
      <View style={{ marginBottom: 30 }}>
        <SignInHeader />
      </View>
      <View style={{ gap: 20 }}>
        <Links text={'FAQs'} clicked={() => {
          Linking.openURL(url1)
            .then((supported) => {
              if (!supported) {
                console.log('Cannot open URL on Mobile:', url1);
              } else {
                console.log('Opened URL:', url1);
              }
            })
            .catch((err) => console.error('Error opening URL:', err));
        }} />

        <Links text={'Privacy Policy'} clicked={() => {
          Linking.openURL(url2)
            .then((supported) => {
              if (!supported) {
                console.log('Cannot open URL on Mobile:', url2);
              } else {
                console.log('Opened URL:', url2);
              }
            })
            .catch((err) => console.error('Error opening URL:', err));
        }} />

        <Links text={'Terms of use'} clicked={() => {
          Linking.openURL(url3)
            .then((supported) => {
              if (!supported) {
                console.log('Cannot open URL on Mobile:', url3);
              } else {
                console.log('Opened URL:', url3);
              }
            })
            .catch((err) => console.error('Error opening URL:', err));
        }} />
      </View>
    </View>
  )
}