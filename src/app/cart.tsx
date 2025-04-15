import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import {  useCart } from '../providers/CartProvider'
import CartListItem from '../components/custom/CartListItem'
import Button from '../components/custom/Button'

const cart = () => {
       const {items,total} = useCart()
  return (
    <View>
       <FlatList 
       data={items}
       renderItem={({item})=><CartListItem cartItem={item}/>}
       contentContainerStyle={{gap:10}}
       />
       <Text style={{marginTop:20,fontSize:20,fontWeight:'500'}}>${total}</Text>
       <Button text='Checkout'/>
      <StatusBar style={Platform.OS==='ios'?'light':'auto'}/>
    </View>
  )
}

export default cart