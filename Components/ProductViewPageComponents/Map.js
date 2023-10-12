import React, { useState } from 'react';
import { View, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [markerHistory, setMarkerHistory] = useState([]);

  function handleMapPress(coordinate) {
    const newMarker = {
      coordinate,
      title: `Marker ${markers.length + 1}`,
    };
    // setMarkers([...markers, newMarker]);
    // setMarkerHistory([...markerHistory, newMarker]);
  }

  const latitude = 31.582045
  const longitude = 74.329376
  const latitudeDelta = 0.0922
  const longitudeDelta = 0.0421

  const label = 'Location'
  const url = `https://www.google.com/maps?q=${latitude},${longitude}&label=${label}`;
  return (
    <>
      <View>
        <MapView
          style={{ flex: 0, height: 250 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          onPress={(e) => {
            Linking.openURL(url)
              .then((supported) => {
                if (!supported) {
                  console.log('Cannot open map URL');
                } else {
                  console.log('Opened map');
                }
              })
              .catch((err) => console.error('Error opening map:', err));
            // handleMapPress(e.nativeEvent.coordinate)
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
            />
          ))}
        </MapView>
        {/* Render history and other components */}
        <View>
          {markerHistory.map((marker, index) => (
            <Text key={index}>{marker.title}</Text>
          ))}
        </View>
      </View>
    </>
  );
}