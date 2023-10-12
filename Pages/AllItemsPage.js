import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FilterContext } from '../Context/FiltersContext';
import { ThemeContext } from '../Context/ThemeContext';
import Product from '../Components/AllItemsPageComponents/Product';
import BottomSheet from '../Components/AllItemsPageComponents/BottomSheet';
import { useNavigation } from '@react-navigation/native';
import { products } from '../Data/Data';
import CustomHeader from '../Components/CustomHeader';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AllItemsPage({ navigation }) {
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


  const { isBuy, isFilter, isSort, sortTitle } = useContext(FilterContext);
  const navigate = useNavigation();

  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [contents, setContents] = useState([
    { title: 'Buy', value: 'Buy' },
    { title: 'Rent', value: 'Rent' }
  ]);
  const [title, setTitle] = useState('Purpose');


  const [searchLocation, setSearchLocation] = useState('')
  const marginLeftRight = 20;

  // function renderProducts(products, marginLeftRight, navigate) {
  //   if (products.length === 0) {
  //     return null; // Base case: no products to render
  //   }

  //   const product = products[0];

  //   return (
  //     <React.Fragment key={product.id}>
  //       <Product
  //         padding={marginLeftRight}
  //         clicked={() => {
  //           navigate.navigate('ProductView', { id: product.id });
  //         }}
  //         product={product}
  //       />
  //       {renderProducts(products.slice(1), marginLeftRight, navigate)} {/* Recursive call */}
  //     </React.Fragment>
  //   );
  // }

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <CustomHeader title={`Property for ${isBuy ? 'Buy' : 'Rent'}`} />
      {
        isLoading ? (
          <Spinner
            color={theme.primary}
            visible={this.state.spinner}
          // textContent={'Loading...'}
          // textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[2]}
              style={{ paddingHorizontal: marginLeftRight, paddingBottom: 0, backgroundColor: 'white' }}>
              <View>
                <TextInput
                  style={styles.styledInput}
                  placeholder='Search for more areas'
                  value={searchLocation}
                  onKeyPress={(ev) => {
                    setSearchLocation(ev.target.value);
                  }}
                />
                <MaterialCommunityIcons
                  style={styles.styledSearchIcon}
                  name="magnify"
                  color={'black'}
                  size={25}
                />
              </View>
              {products.length && (
                <View>
                  <Text style={{ color: 'gray', fontSize: 13 }}>
                    {products.length} properties available
                  </Text>
                </View>
              )}
              <View style={{ backgroundColor: 'white', paddingTop: 10, width: '100%' }}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShow(!show);
                      setTitle('Purpose');
                      setContents([
                        { title: 'Buy', value: 'Buy' },
                        { title: 'Rent', value: 'Rent' }
                      ])
                    }}
                    style={[styles.styledFilterContent, { borderColor: '#E85451' }]}
                  >
                    <Text>{isBuy ? 'Buy' : 'Rent'}</Text>
                    <MaterialCommunityIcons name="chevron-down" color={theme.primary} size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigate.navigate('Filters');
                    }}
                    style={[styles.styledFilterContent, { borderColor: (isFilter ? '#E85451' : 'lightgray') }]}>
                    <MaterialCommunityIcons name="filter-outline" color={theme.primary} size={22} />
                    <Text>Filters</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      setTitle('Sort');
                      setContents([
                        { title: 'New Listening', value: 'New' },
                        { title: 'Low to High', value: 'LowToHigh' },
                        { title: 'Hight to Low', value: 'HighToLow' }
                      ])
                    }}
                    style={[styles.styledFilterContent, { borderColor: (isSort ? '#E85451' : 'lightgray') }]}>
                    <MaterialCommunityIcons name="swap-vertical" color={theme.primary} size={22} />
                    <Text>Sort{isSort && ' - '}{sortTitle()}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
              // showsVerticalScrollIndicator={false}
              >
                <View style={{ gap: 10 }}>
                  {/* <Text>
              {renderProducts(products, marginLeftRight, navigate)}
            </Text> */}
                  {products.map((product) => (
                    <Product padding={marginLeftRight} clicked={() => {
                      navigate.navigate('ProductView', { id: product.id });
                    }} key={product.id} product={product} />
                  ))}
                </View>
              </View>
            </ScrollView>

            {show && (
              <BottomSheet onClose={() => setShow(false)} show={show} title={title} contents={contents} />
            )}
          </>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  styledInput: {
    borderWidth: 1,
    padding: 20,
    marginVertical: 15,
    borderColor: 'gray',
    borderRadius: 5,
  },
  styledSearchIcon: {
    position: 'absolute',
    marginVertical: 12,
    padding: 20,
    right: 0,
  },
  styledFilterContent: {
    flexDirection: 'row',
    gap: 2,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 30,
    margin: 0,
    zIndex: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});