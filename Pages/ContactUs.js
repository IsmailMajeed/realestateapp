import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import CustomHeader from '../Components/CustomHeader';
import Map from '../Components/ProductViewPageComponents/Map';
import DetailView from '../Components/ContactUsPageComponents/DetailView';
import { Styles } from '../Components/CommonStyling/Styles';

const ContactUs = () => {
  const { theme } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const contactInfos = [
    { title: 'Head Office', address: '4th Floor, Beverley Center, Blue Area, Islamabad', email: 'ismailmajeed8@gmail.com', phoneNumber: '+923111437753' },
    { title: 'Lahore Office', address: '9th Arches Arcade, 76-B1, M.M. Alam Road, Gulberg 3, Lahore', email: 'ismailmajeed8@gmail.com', phoneNumber: '+923111437753' },
    { title: 'Karachi Office', address: '1st Floor, Ebrahim Alibhai Tower, Shahrah-e-Faisal Rd, PECHS, Karachi', },
    { title: 'Rawalpandi Office', address: 'Opposite Ayub Park, GT Road, Rawalpindi', },
    { title: 'Innovation Lab', address: '4th Floor, EOBI House, Mauve Area, G-10 Service Rd South, Islamabad', },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader />
      <View style={{ flex: 1 }}>
        <Map />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {contactInfos.map((contactInfo, index) => (
            <DetailView
              key={index}
              index={index}
              changeActiveIndex={(index) => setActiveIndex(index)}
              active={index === activeIndex}
              odd={index % 2 === 0}
              email={contactInfo.email}
              phoneNumber={contactInfo.phoneNumber}
              title={contactInfo.title}
              address={contactInfo.address}
            />
          ))}
          <View style={styles.inputContainer}>
            <Text style={Styles.heading}>Need Some Help?</Text>
            <Text style={[styles.text, { color: theme.text }]}>
              Reach out to us with your issues, questions or feedback. We love hearing from you!
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Styles.inputStyling, styles.inputField]}
                placeholder='Name'
                placeholderTextColor={theme.placeholderText}
              />
              <TextInput
                style={[Styles.inputStyling, styles.inputField]}
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={theme.placeholderText}
              />
              <TextInput
                style={[Styles.inputStyling, styles.inputField]}
                placeholder='Phone'
                keyboardType='numeric'
                placeholderTextColor={theme.placeholderText}
              />
              <TextInput
                style={[Styles.inputStyling, styles.messageInputField]}
                placeholder='Message'
                multiline
                numberOfLines={5}
                placeholderTextColor={theme.placeholderText}
              />
            </View>
            <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.btn }]}>
              <Text style={{ color: theme.invertText, fontWeight: 'bold' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    gap: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  inputWrapper: {
    gap: 10,
    marginTop: 10,
  },
  inputField: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: 'black',
  },
  messageInputField: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
  },
});

export default ContactUs;