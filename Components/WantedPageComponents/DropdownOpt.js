import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import PagerView from 'react-native-pager-view';
import WantedTabContent from './WantedTabContent';

export default function DropdownOpt({ clicked, px = 0, kindType = 'Residential', kind = 'House' }) {
  const [index, setIndex] = useState((kindType === 'Residential') ? 0 : (kindType === 'Plot') ? 1 : 2);
  const [routes] = useState([
    { key: 'Residential', title: 'Residential' },
    { key: 'Plot', title: 'Plot' },
    { key: 'Commercial', title: 'Commercial' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Residential':
        return (
          <WantedTabContent selected={kind} clicked={(content) => clicked(route.key, content)} contents={[
            "House", "Flat", "Lower Portion", "Upper Portion", "Room", "Farm House", "Guest House", "Pent House", "Annexe", "Hostel", "Hotel Suites"
          ]} />
        );
      case 'Plot':
        return (
          <WantedTabContent selected={kind} clicked={(content) => clicked(route.key, content)} contents={[
            "Residential Plot", "Commercial Plot", "Agricultureal Land", "Plot File", "Industrial Land", "Farmhouse Plot"
          ]} />
        );
      case 'Commercial':
        return (
          <WantedTabContent selected={kind} clicked={(content) => clicked(route.key, content)} contents={[
            "Office", "Shop", "Warehouse", "Building", "Hall", "Plaza", "Gym", "Theatre", "Land", "Food Court", "Factory"
          ]} />
        );
      default:
        return null;
    }
  };

  const handleTabPress = useCallback((tabIndex) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(tabIndex);
    }
    setIndex(tabIndex);
  }, []);

  const pagerRef = React.useRef(null);
  return (
    <View style={{ flex: 0, height: 230 }}>
      <View style={styles.optionsHeader}>
        <TouchableOpacity style={[styles.headerStyling, index === 0 && styles.selectedTitle]} onPress={() => handleTabPress(0)}>
          <Text style={styles.headerTitle}>Residential</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerStyling, index === 1 && styles.selectedTitle]} onPress={() => handleTabPress(1)}>
          <Text style={styles.headerTitle}>Plot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerStyling, index === 2 && styles.selectedTitle]} onPress={() => handleTabPress(2)}>
          <Text style={styles.headerTitle}>Commercial</Text>
        </TouchableOpacity>
      </View>

      <PagerView
        // scrollEnabled={false}
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={index}
        onPageSelected={(event) => {
          setIndex(event.nativeEvent.position);
        }}
      >
        {routes.map((route) => (
          <ScrollView showsVerticalScrollIndicator={false} key={route.key} style={{ flex: 1, paddingHorizontal: px }}>
            {renderScene({ route })}
          </ScrollView>
        ))}
      </PagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexGrow: 1,
    fontWeight: '600',
    fontSize: 12,
  },
  headerStyling: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  selectedTitle: {
    borderBottomWidth: 1,
    borderColor: '#E85451',
  },
})