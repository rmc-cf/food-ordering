import { defaultPizzaImage } from '@/assets/data/products';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/custom/RemoteImage';
import Colors from '@/src/constants/Colors';
import { Tables } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Product  = Tables<'products'>

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const { data: product, error, isLoading } = useProduct(id)


  if (isLoading) return <ActivityIndicator />
  if (error) return <Text>Failed to fetch products</Text>
  if (!product) return <Text>Product not found</Text>
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`}
              asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )

        }}
      />
          <RemoteImage 
                            path={product.image}
                            fallback={defaultPizzaImage}
                            style={styles.image}
                            resizeMode="contain"
                            />
      <Text style={styles.title}>
        {product.name}
      </Text>
      <Text style={styles.price}>
        ${product.price}
      </Text>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  }
})
export default ProductDetailsScreen