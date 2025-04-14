import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

export const defaultPizzaImage =
       'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

type ProductListItemProps = {
       product: Product
}

const ProductListItem = ({ product }: ProductListItemProps) => {
       return (
              //作为孩子
              <Link href={`/menu/${product.id}`} asChild>
                     <Pressable style={styles.container}>
                            <Image source={{ uri: product.image || defaultPizzaImage }}
                                   style={styles.image}
                                   resizeMode="contain"
                            />
                            <Text style={styles.title}>{product.name}</Text>
                            <Text style={styles.price}>${product.price}</Text>
                     </Pressable>
              </Link>
       )
}
export default ProductListItem

const styles = StyleSheet.create({
       container: {
              flex: 1,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              maxWidth: '50%'
       },
       image: {
              width: '100%',
              aspectRatio: 1
       },
       title: {
              fontSize: 18,
              fontWeight: "600",
              marginVertical: 10
       },
       price: {
              color: Colors.light.tint
       }
});
