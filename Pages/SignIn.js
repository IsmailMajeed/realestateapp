import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import IntlPhoneField from 'react-native-intl-phone-field';
import InputBox from '../Components/WantedPageComponents/InputBox';
import Hr from '../Components/Hr';
import SocialLogin from '../Components/SignInPageComponents/SocialLogin';
import { Styles } from '../Components/CommonStyling/Styles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import CustomHeader from '../Components/CustomHeader';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SignIn({ navigation }) {
  const { AppleSignIn, promptAsync, handleFacebookLogin } = useContext(UserContext);

  const navigate = useNavigation();
  const [isPhone, setIsPhone] = useState(true);

  const [password, setPassword] = useState('');
  const onChangePassword = (value) => {
    setPassword(value)
  }
  const [email, setEmail] = useState('');
  const onChangeEmail = (value) => {
    setEmail(value)
  }
  const [phoneNumber, setPhoneNumber] = useState('');
  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value)
  }

  const phoneImg = 'https://img.icons8.com/?size=100&id=11409&format=png'
  const appleImg = 'https://img.icons8.com/?size=48&id=86009&format=png'
  const facebookImg = 'https://i.ibb.co/6ZXWbqp/icons8-facebook-48.png'
  const googleImg = 'https://img.icons8.com/?size=96&id=17949&format=png'
  const mailImg = 'https://img.icons8.com/?size=50&id=EWwpy8q9txPU&format=png'

  const { theme } = useContext(ThemeContext);
  const height = Dimensions.get('screen').height;

  const startGoogleSignIn = () => {
    const webClientId = '947463182056-93m160ujl5cc5vjsjob235ovk0gnv52f.apps.googleusercontent.com';
    const redirectUri = 'exp://192.168.1.3:8081/--/auth/google/callback'; // Replace with your server's callback URL
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${webClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;

    Linking.openURL(authUrl);
  };

  const [isLoading, setIsLoading] = useState(false)

  const { setToken, setUserData } = useContext(UserContext);

  const login = () => {
    const data = {
      password: password,
      pageRoll: 0
    }
    if (isPhone) {
      data.phoneNumber = phoneNumber;
    } else {
      data.email = email
    }

    setIsLoading(true)
    axios.post('/user/authenticate', data)
      .then(res => {
        setIsLoading(false)
        setToken(res.data.token)
        setUserData(res.data.id, res.data.name, res.data.phoneNumber, res.data.email, res.data.city, res.data.profilePic)
        navigate.goBack()
      }).catch(err => {
        setIsLoading(false)
        if (err.toString().includes('404')) {
          alert('Invalid Phone number \nor Password');
        } else {
          alert('An error occurred: ' + err);
        }
      })
  }
  state = {
    spinner: isLoading
  };
  return (
    <>
      <CustomHeader />
      {
        isLoading && (
          <Spinner
            color={theme.primary}
            visible={this.state.spinner}
          // textContent={'Loading...'}
          // textStyle={styles.spinnerTextStyle}
          />
        )
      }
      <View style={{ backgroundColor: theme.background, paddingVertical: 35, gap: 30, height: height }}>
        <View style={[styles.container]}>
          {/* <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ borderWidth: 1, height: 50 }}
          onPress={() => AppleSignIn(navigate)}
        /> */}
          <View style={styles.headerContainer}>
            <Text style={[styles.heading, { color: theme.text }]}>Sign in to your account</Text>
            <Text style={{ color: 'gray' }}>Welcome Back!</Text>
          </View>
          <View style={{ gap: 20 }}>
            {
              isPhone ? (
                <>
                  <IntlPhoneField
                    onEndEditing={(result) => {
                      onChangePhoneNumber(result.value)
                    }}
                    // onValidation={(isValid) => console.log(isValid)}
                    defaultCountry="PK"
                    defaultPrefix="+92"
                    defaultFlag="🇵🇰"
                    containerStyle={styles.inputStyling}
                  />
                </>
              ) : (
                <>
                  <InputBox clicked={() => { }} label="Email" value={email} onChangeText={(text) => {
                    onChangeEmail(text)
                  }} />
                </>
              )
            }
            <InputBox password={true} clicked={() => { }} label="Password" value={password} onChangeText={(text) => {
              onChangePassword(text)
            }} />
          </View>
          <View>
            <TouchableOpacity
              onPress={login}
              style={[styles.stylesBtn, { backgroundColor: theme.text }]}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stylesBtn}>
              <Text style={{ color: theme.primary, fontSize: 12 }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'cenrte', paddingHorizontal: 20 }}>
          <Hr />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.orLoginText}>or login using</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 10 }}>
          <View style={styles.showOnlyIOs}>
            <SocialLogin link={appleImg} title={'Login with Apple'} clicked={() => {
              AppleSignIn(navigate)
            }} />
          </View>
          <SocialLogin border={0} link={facebookImg} background='#3b5998' textColor={'white'} title={'Login with Facebook'} clicked={() => {
            handleFacebookLogin();
          }} />
          <SocialLogin link={googleImg} title={'Login with Google'} clicked={() => {
            promptAsync({ useProxy: false, showInResults: true });
            // startGoogleSignIn();
          }} />
          <SocialLogin link={isPhone ? phoneImg : mailImg} title={`Login with ${!isPhone ? 'Email' : 'Phone'}`} clicked={() => {
            setIsPhone(!isPhone)
          }} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigate.navigate('SignUp')}>
            <Text style={{ fontSize: 13, textDecorationLine: 'underline', color: theme.text }}>Don't have an account? Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white'
    gap: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600'
  },
  headerContainer: {
    alignItems: 'center',
    gap: 3
  },
  inputStyling: Styles.inputStyling,
  stylesBtn: {
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: 10,
  },
  orLoginText: {
    color: 'gray',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    fontSize: 12,
    position: 'relative',
    top: -9
  },
  showOnlyIOs: {
    ...Platform.select({
      android: {
        display: 'none'
      },
    })
  }
})