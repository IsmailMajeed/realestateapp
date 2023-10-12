import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/HomeComponents/Header';
import DescriptiveComponent from '../Components/HomeComponents/DescriptiveComponent';
import { useContext } from 'react';
import { FilterContext } from '../Context/FiltersContext';

export default function Home({ navigation }) {
  const {isBuy} = useContext(FilterContext)

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <Header navigation={navigation} />
      <DescriptiveComponent navigate={'InvestNow'} isBuy={isBuy} image={'https://www.graana.com/_next/image/?url=%2Fhome-page-images%2Finvest.png&w=1200&q=75'} title={'Invest'} description={'Invent in fully legal Imarat Property'} btn={'INVEST NOW'} isReverse={false} color={'white'} isCategory={false} />
      <DescriptiveComponent navigate={'Wanted'} isBuy={isBuy} image={'https://www.graana.com/_next/image/?url=%2Fhome-page-images%2F3ClicksLogo.png&w=256&q=75'} title={'Wanted'} description={'In just 3 clicks activate a team of experts to find the properties you need'} btn={'WANTED'} isReverse={true} color={'#f1f1f1'} isCategory={false} />
      <DescriptiveComponent navigate={'All Items Show Here'} isBuy={true} image={'https://i.postimg.cc/vH3v1j9P/image-6.png'} title={'Buy a property'} description={'Find where “perfect” meets "happy"'} btn={'BROWSE'} isReverse={false} color={'white'} isCategory={true} />
      <View style={styles.horizontalLine} />
      <DescriptiveComponent navigate={'New Property'} isBuy={isBuy} image={'https://i.postimg.cc/htv1Vr1K/image-7.png'} title={'Sell a property'} description={'Get the best value in an economy'} btn={'ADD DETAILS'} isReverse={true} color={'white'} isCategory={true} />
      <View style={styles.horizontalLine} />
      <DescriptiveComponent navigate={'All Items Show Here'} isBuy={false} image={'https://i.postimg.cc/c4smLZKg/image-8.png'} title={'Rent a property'} description={'Live where you can love'} btn={'FIND RENTALS'} isReverse={false} color={'white'} isCategory={true} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: 'lightgray', // You can change the color here
    borderBottomWidth: 1, // You can adjust the width to change the line thickness
    marginHorizontal: 35,
  },
});
