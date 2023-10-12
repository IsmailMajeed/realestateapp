import React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import PagerView from 'react-native-pager-view';
import Hr from '../Components/Hr';
import Range from '../Components/FilterPageComponents/Range';
import SwitchComponent from '../Components/FilterPageComponents/Switch';
import Checkbox from '../Components/FilterPageComponents/Checkbox';
import Search from '../Components/FilterPageComponents/Search';
import BottomSheet from '../Components/AllItemsPageComponents/BottomSheet';
import { FilterContext } from '../Context/FiltersContext';
import TabContent from '../Components/FilterPageComponents/TabContent';
import CustomHeader from '../Components/CustomHeader';
import { ThemeContext } from '../Context/ThemeContext';
// import { TabView } from 'react-native-tab-view';

export default function Filters() {
  const { condition } = useContext(FilterContext);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const layout = useWindowDimensions();

  const [routes] = useState([
    { key: 'Residential', title: 'Residential' },
    { key: 'Plot', title: 'Plot' },
    { key: 'Commercial', title: 'Commercial' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Residential':
        return (
          <TabContent contents={[
            "House", "Flat", "Lower Portion", "Upper Portion", "Room", "Farm House", "Guest House", "Pent House", "Annexe", "Hostel", "Hotel Suites"
          ]} />
        );
      case 'Plot':
        return (
          <TabContent contents={[
            "Residential Plot", "Commercial Plot", "Agricultureal Land", "Plot File", "Industrial Land", "Farmhouse Plot"
          ]} />
        );
      case 'Commercial':
        return (
          <TabContent contents={[
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
  const initialLayout = { width: Dimensions.get('window').width };

  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <CustomHeader title={'Filters'} />
      <ScrollView showsVerticalScrollIndicator={false} style={[{ flex: 1, backgroundColor: 'white' }, styles.shadow]}>
        <View>
          <Text style={{ fontWeight: 'bold', padding: 15 }}>Property Type</Text>
        </View>
        <View style={{ flex: 0, height: 250 }}>
          {/* <TabView
            renderTabBar={() => (
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
            )}
            // renderTabBar={() => <TabBar renderTab={() => <Text>Hello</Text>} underlineColor='#E85451' />}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          /> */}
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
          <Hr />
          <PagerView
            scrollEnabled={false}
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={index}
            onPageSelected={(event) => {
              setIndex(event.nativeEvent.position);
            }}
          >
            {routes.map((route) => (
              <ScrollView showsVerticalScrollIndicator={false} key={route.key} style={{ flex: 1 }}>
                {renderScene({ route })}
              </ScrollView>
            ))}
          </PagerView>
        </View>

        <Range title={'Price Range'} />
        <Range title={'Area Range'} />

        {
          (index !== 1) && (
            <View style={{ gap: 20 }}>
              <Checkbox title={"Bedroom"} options={[
                'Studio', 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'
              ]} />
              <Checkbox title={"Bathroom"} options={[
                1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'
              ]} />
            </View>
          )
        }

        <View style={{ gap: 20, marginTop: 20, marginBottom: 10 }}>
          <SwitchComponent title={'PropSure Verified'} desc={'Property Verified by Graana'} />
          <Search clicked={() => { }} title={'Add Features'} placeholder={'Try "kitchen","balcony" etc'} />
          <SwitchComponent title={'Hide Viewed Property'} desc={'Property you have already seen'} />
          <Search clicked={() => { }} title={'Select Agency'} placeholder={'Search Agencies'} showIcon={true} />

          <Search clicked={() => {
            setShow(true)
          }}
            title={'Choose Condition of Property'}
            placeholder={condition || 'Choose Your Condition of property'}
            active={condition ? true : false}
            showIcon={true}
            iconName='chevron-down'
            iconColor='#E85451' />
        </View>

      </ScrollView>
      {
        show && (
          <BottomSheet onClose={() => setShow(false)} show={show} title={'Select the condition'} contents={[
            { title: 'Any', value: 'Condition' },
            { title: 'Brand new', value: 'Condition' },
            { title: 'Excellent - in a good shape & well maintained', value: 'Condition' },
            { title: 'Good - in a good shape, need cosmetic updates', value: 'Condition' },
            { title: 'Need minor work - needs a few minor renovations', value: 'Condition' },
            { title: 'Need major work - needs a major renovations inside and out', value: 'Condition' }
          ]} />
        )
      }
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingRight: 20
      }}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: theme.text, fontWeight: 'bold' }}>RESET ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.btn }]}>
          <Text style={{ color: theme.invertText, fontWeight: 'bold' }}>SHOW 0 ADS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7
  }
});