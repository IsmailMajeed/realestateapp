import React, { createContext, useEffect, useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as Facebook from 'expo-facebook';
import { Linking } from 'react-native';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);

  const AppleSignIn = async (navigate) => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });


      setToken(credential.identityToken);
      // console.log(credential);
      navigate.goBack();
      // signed in
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '511771270894-ib0q9o355bqgdsdecb2gramunut3d312.apps.googleusercontent.com',
    iosClientId: '511771270894-4g0gjef2bbpf5oafa32bo4vu8ep3v6q4.apps.googleusercontent.com',
    // expoClientId: '481097234336-g3g4jdisj9uk2c34nmu2n8m2j8nmgg3p.apps.googleusercontent.com'
    // webClientId: '481097234336-s73lk5a5bdocjkr5ekm9tggc0oikabgt.apps.googleusercontent.com',
    // redirectUri: 'exp://192.168.0.104:8081/--/auth/google/callback'
    // clientId: '481097234336-f1gfjkufrh2jftolv9kjan0rvu8a54b5.apps.googleusercontent.com'
  })

  const startGoogleSignIn = () => {
    const webClientId = '481097234336-s73lk5a5bdocjkr5ekm9tggc0oikabgt.apps.googleusercontent.com';
    const redirectUri = 'exp://192.168.0.104:8081/--/auth/google/callback'; // Replace with your server's callback URL
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${webClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;

    Linking.openURL(authUrl);
  };

  useEffect(() => {
    handleGoogleLogin()
  }, [response])

  const handleGoogleLogin = async () => {
    const user = await AsyncStorage.getItem('@user')
    if (!user) {
      if (response?.type === 'success')
        await getUserInfo(response.authentication.accessToken)
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

    } catch (error) {

    }
  }

  const handleFacebookLogin = async () => {
    // try {
    //   await Facebook.initializeAsync({
    //     appId: '827922532667790'
    //   });
    //   const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    //     permissions: ['public_profile'],
    //   });
    //   if (type === 'success') {
    //     console.log('Facebook login success:', token);
    //   } else {
    //     console.log('Facebook login cancelled.');
    //   }
    // } catch (error) {
    //   console.error('Facebook login error:', error);
    // }
  };

  const setUserData = async (id = '', name = '', phoneNumber = '', email = '', city = '', profilePic = '') => {
    setUserInfo({ id: id, name: name, phoneNumber: phoneNumber, email: email, city: city, profilePic: profilePic });
    await AsyncStorage.setItem("@user", JSON.stringify({ id, name, phoneNumber, email, city, profilePic }));
    await AsyncStorage.setItem("@token", JSON.stringify(token));
  };

  const logOut = async () => {
    setToken(null);
    setUserInfo(null);

    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@token");
  }

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem("@token");
      const storedUser = await AsyncStorage.getItem("@user");
      const parsedUser = JSON.parse(storedUser || '{}'); // Parse the JSON or use an empty object

      // console.log(storedToken); // Check if the token is retrieved correctly
      // console.log(parsedUser); // Check if the user data is parsed correctly

      setToken(storedToken);
      setUserInfo(parsedUser);
    };

    fetchData(); // Call the async function immediately

    // Specify any dependencies if needed (e.g., someId)
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, AppleSignIn, promptAsync, handleFacebookLogin, startGoogleSignIn, setUserData, userInfo, logOut }}>
      {children}
    </UserContext.Provider>
  );
}