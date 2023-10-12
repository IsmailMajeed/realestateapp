import { View, Text } from 'react-native'
import React from 'react'
import { Styles } from '../CommonStyling/Styles';

import { WebView } from 'react-native-webview';

export default function VideoView({ videos }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={Styles.heading}>Videos</Text>
      <View style={{ gap: 10 }}>
        {
          videos && videos.map((video, index) => (
            <WebView
              key={index}
              source={{ uri: video }}
              style={{ flex: 1, height: 250 }}
            />
          ))
        }
      </View>
    </View>
  )
}