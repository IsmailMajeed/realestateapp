import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Carousel from 'react-native-swipeable-carousel';
import { SliderBox } from "react-native-image-slider-box";
import ContactInfo from '../ProductViewPageComponents/ContactInfo';
import { ThemeContext } from '../../Context/ThemeContext';

// import ImageCarousel from './ImageCaruosel';

const IMARAT_IMG = 'https://www.graana.com/_next/image/?url=http%3A%2F%2Fres.cloudinary.com%2Fgraanacom%2Fimage%2Fupload%2Fv1657016870%2Fk2schpho0kgshrmqwacp.png&w=384&q=75'

const Project = ({ project, clicked, padding = 0, border = 0 }) => {
  const screenWidth = Dimensions.get('window').width;
  const { theme } = useContext(ThemeContext);

  this.state = { images: project.images }
  return (
    <View style={{ backgroundColor: 'white', borderWidth: border, borderColor: '#F7F2F1', borderRadius: 10, width: screenWidth - (padding * 2), marginBottom: 0, overflow: 'hidden' }}>

      <View style={{ width: screenWidth - (padding * 2) }}>
        <View style={{ backgroundColor: '#363636' }}>
          <SliderBox
            // autoplay={true}
            imageLoadingColor='#E85451'
            paginationBoxStyle={{ width: 0 }}
            dotStyle={{ width: 6, height: 6 }}
            onCurrentImagePressed={() => clicked()}
            activeOpacity={1}
            dotColor="#E85451"
            parentWidth={screenWidth - (padding * 2)}
            style={styles.styledImage}
            images={this.state.images} />
        </View>
        <View style={{ backgroundColor: theme.primary, position: 'absolute', margin: 10, paddingVertical: 5, paddingHorizontal: 7 }}>
          <Text style={{ color: 'white', fontSize: 13 }}>Mega project</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => clicked()}
        style={{ gap: 5, paddingVertical: 10, }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold' }}>PKR</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 3, }}>{project.price} - {project.price}</Text>
          <View style={{ flex: 1, alignItems: 'center', gap: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <MaterialCommunityIcons
              name="shield-check"
              color={theme.primary}
              size={25} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 15, paddingHorizontal: 10, borderWidth: 0 }}>
          <View style={{ borderWidth: 0 }}>
            <Image
              source={{ uri: IMARAT_IMG }}
              style={{ borderWidth: 0, width: 70, height: 50, objectFit: 'contain' }}
            />
          </View>
          <View style={{ gap: 1, paddingVertical: 5 }}>
            <Text style={{ fontWeight: '600' }}>MALL of IMARAT</Text>
            <Text style={{ color: 'gray' }}>Islamabad Expressway, Islamabad</Text>
          </View>
        </View>

        <View style={styles.contactInfoContainer}>
          <ContactInfo phoneNumber={project.phoneNumber} />
        </View>

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  styledImage: {
    height: 200,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  }
})

export default Project;