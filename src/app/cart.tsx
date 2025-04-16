import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, Platform, Text, View } from 'react-native'
import Button from '../components/custom/Button'
import CartListItem from '../components/custom/CartListItem'
import { useCart } from '../providers/CartProvider'

const cart = () => {
       const {items,total,checkout} = useCart()
  return (
    <View>
       <FlatList 
       data={items}
       renderItem={({item})=><CartListItem cartItem={item}/>}
       contentContainerStyle={{gap:10}}
       />
       <Text style={{marginTop:20,fontSize:20,fontWeight:'500'}}>${total}</Text>
       <Button onPress={checkout} text='Checkout'/>
      <StatusBar style={Platform.OS==='ios'?'light':'auto'}/>
    </View>
  )
}

export default cart