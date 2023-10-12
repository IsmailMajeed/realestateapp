import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import IntlPhoneField from 'react-native-intl-phone-field';
import InputBox from '../Components/WantedPageComponents/InputBox';
import Hr from '../Components/Hr';
import SocialLogin from '../Components/SignInPageComponents/SocialLogin';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import { Styles } from '../Components/CommonStyling/Styles';
import CustomHeader from '../Components/CustomHeader';
import axios from 'axios';

export default function SignUp({ navigation }) {
  const appleImg = 'https://img.icons8.com/?size=48&id=86009&format=png'
  const facebookImg = 'https://i.ibb.co/6ZXWbqp/icons8-facebook-48.png'
  const googleImg = 'https://img.icons8.com/?size=96&id=17949&format=png'

  const { theme } = useContext(ThemeContext);
  const { AppleSignIn } = useContext(UserContext);

  const height = Dimensions.get('screen').height;

  const navigate = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('')
  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value)
  }

  const [confirmPassword, setConfirmPassword] = useState('');
  const onChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const [password, setPassword] = useState('');
  const onChangePassword = (value) => {
    setPassword(value)
  }
  const [email, setEmail] = useState('');
  const onChangeEmail = (value) => {
    setEmail(value)
  }
  const [name, setName] = useState('');
  const onChangeName = (value) => {
    setName(value)
  }

  const [mismatchPassword, setMismatchPassword] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword) {
      setMismatchPassword(true)
    } else {
      setMismatchPassword(false)
    }
  }, [password, confirmPassword]);


  const createAccount = () => {
    if (password !== confirmPassword) {
      setMismatchPassword(true)
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    }
    axios.post('/user/register', data)
      .then(res => {
        // console.log(res)
        navigate.goBack()
      })
      .catch(err => console.log(err))
  }

  return (
    <View>
      <CustomHeader />
      <KeyboardAvoidingView
        // style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on the platform
      >
        <ScrollView>
          <View style={{
            backgroundColor: theme.background,
            paddingVertical: 20,
            gap: 20,
            height: height - 80,
            ...Platform.select({
              android: {
                height: height - 50
              }
            })
          }}>
            <View style={[styles.container]}>
              <View style={styles.headerContainer}>
                <Text style={[styles.heading, { color: theme.text }]}>Create an account</Text>
                <Text style={{ color: 'gray' }}>Experiance the full power of Graana</Text>
              </View>
              <View style={{ gap: 20 }}>
                <InputBox clicked={() => { }} label="Name" value={name} onChangeText={(text) => {
                  onChangeName(text)
                }} />
                <InputBox clicked={() => { }} label="Email" value={email} onChangeText={(text) => {
                  onChangeEmail(text)
                }} />
                <IntlPhoneField
                  onEndEditing={(result) => onChangePhoneNumber(result.value)}
                  // onValidation={(isValid) => console.log(isValid)}
                  defaultCountry="PK"
                  defaultPrefix="+92"
                  defaultFlag="🇵🇰"
                  containerStyle={styles.inputStyling}
                />
                <InputBox password={true} clicked={() => { }} label="Password" value={password} onChangeText={(text) => {
                  onChangePassword(text)
                }} />
                <InputBox password={true} clicked={() => { }} label="Confirm Password" value={confirmPassword} onChangeText={(text) => {
                  onChangeConfirmPassword(text)
                }} />
                {
                  mismatchPassword && (
                    <Text style={{ color: theme.primary, fontSize: 11 }}>Password not match</Text>
                  )
                }
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    createAccount()
                  }}
                  style={[styles.stylesBtn, { backgroundColor: theme.text }]}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: 'cenrte', paddingHorizontal: 20, marginTop: 15 }}>
              <Hr />
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.orLoginText}>OR</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, gap: 10 }}>
              <View style={styles.showOnlyIOs}>
                <SocialLogin link={appleImg} title={'Continue with Apple'} clicked={() => {
                  AppleSignIn(navigate)
                }} />
              </View>
              <SocialLogin border={0} link={facebookImg} background='#3b5998' textColor={'white'} title={'Continue with Facebook'} clicked={() => {
                // handleFacebookLogin();
              }} />
              <SocialLogin link={googleImg} title={'Continue with Google'} clicked={() => {
                // promptAsync();
                // handleGoogleLogin();
                // signInWithGoogleAsync();
              }} />
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => navigate.navigate('SignIn')}>
                <Text style={{ fontSize: 13, textDecorationLine: 'underline', color: theme.text }}>Already have an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white'
    gap: 35,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
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