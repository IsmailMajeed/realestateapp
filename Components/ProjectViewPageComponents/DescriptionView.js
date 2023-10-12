import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'
import { Styles } from '../CommonStyling/Styles';

export default function DescriptionView({ descriptions }) {
  const { theme } = useContext(ThemeContext);
  const [showMore, setShowMore] = useState(false)

  return (
    <View>
      <View style={!showMore && { height: 80, overflow: 'hidden' }}>
        <Text style={Styles.heading}>
          Description
        </Text>
        {
          descriptions && descriptions.map((description, index) => (
            <View key={index}>
              <Text style={{ color: 'gray', fontWeight: '500', marginVertical: 5 }}>{description.title}</Text>
              <Text style={{ color: 'gray' }}>{description.paragraph}</Text>
            </View>
          ))
        }
      </View>
      <TouchableOpacity
        onPress={() => setShowMore(!showMore)}
      >
        <Text style={{ color: theme.primary }}>
          {
            showMore ? 'Show less' : 'Show More'
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}