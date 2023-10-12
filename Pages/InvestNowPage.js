import { View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Project from '../Components/InvestNowPageComponents/Project'
import { projects } from '../Data/Data'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../Components/CustomHeader'
import Spinner from 'react-native-loading-spinner-overlay';
import { ThemeContext } from '../Context/ThemeContext'

const PADDING = 15

export default function InvestNowPage() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(true)
  state = {
    spinner: true
  };
  useEffect(() => {
    setInterval(() => {
      state.spinner = false
      setIsLoading(false)
    }, 100);
  }, [])
  return (
    <>
      <CustomHeader title='Properties in Pakistan' />
      {
        isLoading ? (
          <Spinner
            color={theme.primary}
            visible={this.state.spinner}
          // textContent={'Loading...'}
          // textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <ScrollView
            style={{ padding: PADDING, backgroundColor: 'white' }}>
            <View style={{ gap: 20, paddingBottom: PADDING * 2 }}>
              {
                projects.map((project) => (
                  <Project padding={PADDING} project={project} clicked={() => {
                    navigation.navigate('Project View', { id: project.id })
                  }} />
                ))
              }
            </View>
          </ScrollView>
        )
      }
    </>
  )
}