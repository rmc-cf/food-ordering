import { useMyOrderList } from "@/src/api/orders";
import OrderListItem from "@/src/components/custom/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrdersScreen() {
         const {data:orders,isLoading,error} = useMyOrderList()
               if (isLoading) return <ActivityIndicator />
                if (error) return <Text>Failed to fetch orders</Text>
       
       return (
              
              <FlatList
                     data={orders}
                     renderItem={({ item }) => <OrderListItem order={item} />}
                     contentContainerStyle={{gap:10,padding:10}}
              />
       )
}