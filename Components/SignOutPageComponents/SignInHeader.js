import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Hr from '../Hr';
import { ThemeContext } from '../../Context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

const SignInHeader = () => {
  const { theme } = useContext(ThemeContext);
  const width = Dimensions.get('screen').width;
  const url = 'https://nordvpn.com/wp-content/uploads/blog-social-nordvpn-login-and-sign-up-process-explained-1200x628-2.png';
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.imgStyle} source={{ uri: url }} />
        <Text style={styles.description}>Sign in to add or view your properties</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn')
          }}
          style={[styles.button, { backgroundColor: theme.text, width: width - 40 }]}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={[styles.button, { width: width - 40 }]}>
          <Text style={[styles.buttonText, { color: theme.text }]}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
      <Hr />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 40,
  },
  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  description: {
    fontSize: 10,
    color: 'gray',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default SignInHeader;