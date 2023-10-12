import { View, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext';
import LoginedPage from './LoginedPage';
import SignedOutPage from './SignedOutPage';
import { UserContext } from '../Context/UserContext';

export default function More({ navigation }) {
  const { theme } = useContext(ThemeContext)
  const { token } = useContext(UserContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {
        token ? (<LoginedPage />)
          : (<SignedOutPage />)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 30
  },
});