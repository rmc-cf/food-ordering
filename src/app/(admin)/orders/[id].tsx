import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/custom/OrderItemListItem";
import OrderListItem from "@/src/components/custom/OrderListItem";
import Colors from "@/src/constants/Colors";
import { OrderStatusList } from "@/src/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function OrderDetailsScreen() {
       const { id } = useLocalSearchParams();
       const order = orders.find((o) => o.id.toString() === id)
       if (!order) return (
              <Text>Not found</Text>
       )
       return <View style={
              {
                     padding: 10,
                     gap: 20,
                     flex: 1
              }
       }>
              <Stack.Screen
                     options={{
                            title: `Order #${id}`
                     }}
              />
              <FlatList
                     data={order.order_items}
                     renderItem={({ item }) => <OrderItemListItem item={item} />}
                     contentContainerStyle={{ gap: 10 }}
                     ListHeaderComponent={() => <OrderListItem order={order} />}
                     ListFooterComponent={() => (
                            <>
                                   <Text style={{ fontWeight: 'bold' }}>Status</Text>
                                   <View style={{ flexDirection: 'row', gap: 5 }}>
                                          {OrderStatusList.map((status) => (
                                                 <Pressable
                                                        key={status}
                                                        onPress={() => {}}
                                                        style={{
                                                               borderColor: Colors.light.tint,
                                                               borderWidth: 1,
                                                               padding: 10,
                                                               borderRadius: 5,
                                                               marginVertical: 10,
                                                               backgroundColor:
                                                                      order.status === status
                                                                             ? Colors.light.tint
                                                                             : 'transparent',
                                                        }}
                                                 >
                                                        <Text
                                                               style={{
                                                                      color:
                                                                             order.status === status ? 'white' : Colors.light.tint,
                                                               }}
                                                        >
                                                               {status}
                                                        </Text>
                                                 </Pressable>
                                          ))}
                                   </View>
                            </>
                     )}
              />

       </View>
}