import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomHeader from '../CustomHeader'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../Context/ThemeContext';
import FeatureOpt from './FeatureOpt';
import { features } from '../../Data/Data';
import { useNavigation } from '@react-navigation/native';
import BottomSheetNew from '../BottomSheet'

const AddFeatures = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState('')
  const { height } = Dimensions.get('screen')
  const navigation = useNavigation();
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const [featuresAndAmentities, setFeaturesAndAmentities] = useState([])

  const toggleFeatures = (value, remove = false) => {
    const existingOptionIndex = featuresAndAmentities.findIndex((item) => item.featureName === value.featureName && item.title === value.title && item.type === value.type);
    if (existingOptionIndex !== -1) {
      // If it's selected, remove it from the array
      const updatedFeatures = [...featuresAndAmentities];
      if (value.type === 'select' && !remove) {
        if (featuresAndAmentities[existingOptionIndex].value !== value.value) {
          updatedFeatures[existingOptionIndex].value = value.value
        }
      } else {
        updatedFeatures.splice(existingOptionIndex, 1);
      }
      setFeaturesAndAmentities(updatedFeatures);
    } else {
      // If it's not selected, add it to the array
      setFeaturesAndAmentities([...featuresAndAmentities, value]);
    }
  }

  const updateFeature = (option, work) => {
    const updatedFeatures = [...featuresAndAmentities];
    const index = updatedFeatures.findIndex((opt) => opt.title === option.title && opt.type === option.type);

    if (index !== -1) {
      if (work === 'add') {
        updatedFeatures[index].count++;
      } else {
        updatedFeatures[index].count--;
      }

      if (updatedFeatures[index].count === 0) {
        updatedFeatures.splice(index, 1);
      }

      setFeaturesAndAmentities(updatedFeatures);
    }
  };

  const getCountForFeature = (featureName) => {
    const filteredOptions = featuresAndAmentities.filter((option) => option.featureName === featureName);
    return filteredOptions.length;
  };

  // const getCountForFeature = (featureName) => {
  //   return featuresAndAmentities.reduce((count, option) => {
  //     if (option.featureName === featureName) {
  //       return count + option.count;
  //     }
  //     return count;
  //   }, 0);
  // };

  const [selectedOpt, setSelectedOpt] = useState({})
  const setSelectValueFromBottomSheet = (value) => {
    toggleFeatures({ value: value, ...selectedOpt })
    setSelectedOpt({})
    setShowBottomSheet(false)
  }

  console.log(featuresAndAmentities);
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', height: height }}>
      <CustomHeader title='Features and Amentities' />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <SafeAreaView style={styles.searchArea}>
          <TextInput value={search} onChangeText={(Text) => {
            setSearch(Text)
          }} placeholder='Search Features' />
          <MaterialCommunityIcons
            style={{
              position: 'absolute',
              right: 10,
              paddingVertical: 10
            }}
            name='magnify'
            color='gray'
            size={25} />
        </SafeAreaView>

        {
          featuresAndAmentities.length > 0 && (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 20,
                gap: 10
              }}
            >
              {
                featuresAndAmentities.map((feature, index) => (
                  <View key={index} style={styles.selectedOpt}>
                    {
                      feature.type === 'addable' && (
                        <Text>{feature.count}</Text>
                      )
                    }
                    <Text>{feature.title}</Text>
                    <TouchableOpacity
                      onPress={() => toggleFeatures(feature, true)}
                    >
                      <MaterialCommunityIcons
                        name='close'
                        color='black'
                        size={15} />
                    </TouchableOpacity>
                  </View>
                ))
              }
            </ScrollView>
          )
        }

        <View style={{ margin: 20, gap: 20 }}>
          {
            features && features.map((feature, index) => (
              <FeatureOpt
                key={index}
                update={(index, work) => updateFeature(index, work)}
                count={getCountForFeature(feature.title)}
                selected={featuresAndAmentities}
                title={feature.title}
                options={feature.options}
                select={(option) => {
                  setSelectedOpt(option)
                  setShowBottomSheet(true)
                }}
                clicked={(value) => toggleFeatures(value)}
              />
            ))
          }
        </View>
      </ScrollView>
      <View style={{
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
        <TouchableOpacity onPress={() => setFeaturesAndAmentities([])}>
          <Text style={{
            fontWeight: '600',
            color: theme.text,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10
          }}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Text style={{
            fontWeight: '600',
            color: theme.invertText,
            backgroundColor: theme.btn,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            overflow: 'hidden'
          }}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
      {
        showBottomSheet && (
          <BottomSheetNew show={showBottomSheet} title={'Select'} contents={selectedOpt.selectedOptions} onClose={(value) => setSelectValueFromBottomSheet(value)} />
        )
      }
    </SafeAreaView>
  )
}

export default AddFeatures

const styles = StyleSheet.create({
  searchArea: {
    borderWidth: 0.5,
    borderColor: '#e1e1e1',
    margin: 20,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  selectedOpt: {
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})