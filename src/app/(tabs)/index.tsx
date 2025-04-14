import products from '@/assets/data/products';
import ProductListItem from '@/src/components/custom/ProductListItem';
import Colors from '@/src/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const product = products[0]

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/>
      <ProductListItem product={products[2]}/>
    </View>
  );
}
