import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import products, { defaultPizzaImage } from '@/assets/data/products';
import Button from '@/src/components/custom/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';

const sizes :PizzaSize[]= ['S','M','L','XL']

const ProductDetailsScreen = () => {
  const {addItem} = useCart()
  const {id} = useLocalSearchParams();
  const [selectedSize,setSelectedSize] = useState<PizzaSize>('M')
  const product = products.find(p=>p.id.toString()===id)
  
  const addToCart = ()=>{
    if(!product) return;
    addItem(product,selectedSize)
    router.push('/cart')
  }
  if(!product){
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
      options={{
        title:product?.name
      }}/>
      <Image source={{uri:product.image||defaultPizzaImage}}
      style={styles.image}/>
      <Text>Select size</Text>
    <View style={styles.sizes}>
    {sizes.map((size)=>(
      <Pressable 
      onPress={()=>setSelectedSize(size)}
       key={size}
       style={[styles.size,
       {backgroundColor:selectedSize===size?'gainsboro':'white'}
       ]}>

        <Text 
         style={[styles.sizeText,
          {color:selectedSize===size?'black':'gray'}
          ]}
        >{size}</Text>
        </Pressable>
      ))}
    </View>
      <Text style={styles.title}>
        {product.name}
        </Text>
        <Text style={styles.price}>
        ${product.price}
        </Text>
        <Button  onPress={addToCart} text='Add to cart'/>
    </View>

  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:10
  },
  image:{
    width:'100%',
    aspectRatio:1
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
  sizes:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:10
  },
  size:{
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  sizeText:{
    fontSize:20,
    fontWeight:'500'
  },
  price:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:'auto'
  }
})
export default ProductDetailsScreen