import { View, Text, Dimensions, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { projects } from '../Data/Data'
import { ThemeContext } from '../Context/ThemeContext'
import { SliderBox } from "react-native-image-slider-box";
import Hr from '../Components/Hr';
import DescriptionView from '../Components/ProjectViewPageComponents/DescriptionView';
import Map from '../Components/ProductViewPageComponents/Map'
import ContactInfo from '../Components/ProductViewPageComponents/ContactInfo'

import VideoView from '../Components/ProjectViewPageComponents/VideoView';
import Listings from '../Components/ProjectViewPageComponents/Listings';
import { Styles } from '../Components/CommonStyling/Styles';

import { verifiedImg } from '../Data/Data';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';

const IMARAT_IMG = 'https://www.graana.com/_next/image/?url=http%3A%2F%2Fres.cloudinary.com%2Fgraanacom%2Fimage%2Fupload%2Fv1657016870%2Fk2schpho0kgshrmqwacp.png&w=384&q=75'

const ProjectView = ({ route }) => {
  const { id } = route.params
  const project = projects.find((item) => item.id === id)
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('screen').width

  this.state = { images: project.images }

  return (
    <>
      <CustomHeader />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: '#363636' }}>
          <SliderBox
            // autoplay={true}
            imageLoadingColor='#E85451'
            paginationBoxStyle={{ width: 0 }}
            dotStyle={{ display: 'none' }}
            // dotStyle={{ width: 6, height: 6, display:'none' }}
            onCurrentImagePressed={() => {
              navigation.navigate('Gallary', { images: project.images })
            }}
            activeOpacity={1}
            dotColor="#E85451"
            parentWidth={screenWidth}
            images={this.state.images} />
          <Image
            source={{ uri: verifiedImg }}
            style={styles.imgStyle}
          />
        </View>

        <View style={{ paddingHorizontal: 15, paddingBottom: 100 }}>
          <View style={{ gap: 4, paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '600' }}>PKR</Text>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>{project.price} - {project.price}</Text>
            </View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              {project.name}
            </Text>
            <Text style={{ color: theme.primary }}>
              {project.location}
            </Text>
          </View>

          <Hr />

          <View style={{ gap: 30 }}>
            <View style={{ marginTop: 10 }}>
              <DescriptionView descriptions={project.descriptions} />
            </View>

            <View style={{ gap: 10 }}>
              <VideoView videos={project.videos} />
            </View>

            <View>
              <Listings listings={project.listings} />
            </View>

            <View>
              <Text style={[Styles.heading, { marginBottom: 10 }]}>Location</Text>
              <Map />
            </View>

            <View style={{ gap: 10 }}>
              <Text style={Styles.heading}>Developed By</Text>
              <View style={{ borderWidth: 1, padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: '#E9E7E7' }}>
                <Image
                  source={{ uri: IMARAT_IMG }}
                  style={{ width: 80, height: 80, objectFit: 'contain', borderWidth: 0, backgroundColor: '#E9E7E7', borderRadius: 10 }}
                />
                <View>
                  <Text style={{ color: theme.text, fontWeight: '600' }}>{project.developer}</Text>
                  <Text style={{ color: 'gray' }}>{project.developerOffice}</Text>
                </View>

                <Image
                  source={{ uri: verifiedImg }}
                  style={styles.imgStyle}
                />
              </View>
            </View>

          </View>

        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <ContactInfo phoneNumber={project.phoneNumber} />
      </View>
    </>
  )
}

export default ProjectView;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    gap: 10,
    // borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 13,
    borderRadius: 15,
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    ...Platform.select({
      android: {
        elevation: 5,
      }
    })
  },
  imgStyle: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    objectFit: 'contain',
    position: 'absolute',
    right: 10,
    top: 10
  }
})