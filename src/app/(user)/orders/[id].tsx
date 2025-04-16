import { useOrderDetails } from "@/src/api/orders";
import OrderItemListItem from "@/src/components/custom/OrderItemListItem";
import OrderListItem from "@/src/components/custom/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {

      const { id: idString } = useLocalSearchParams();
      const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
      const { data: order, error, isLoading } = useOrderDetails(id)
      if (isLoading) return <ActivityIndicator />
      if (error) return <Text>Failed to fetch products</Text>
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
              />

       </View>
}