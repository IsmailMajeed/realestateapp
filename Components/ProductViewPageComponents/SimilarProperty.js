import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { products } from '../../Data/Data'
import Product from '../AllItemsPageComponents/Product';
import { useNavigation } from '@react-navigation/native';

export default function SimilarProperty() {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '600', fontSize: 16 }}>Similar properties nearby</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {products.map((product) => (
            <Product padding={20} clicked={() => {
              navigate.push('ProductView', { id: product.id });
            }} 
            key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  }
})