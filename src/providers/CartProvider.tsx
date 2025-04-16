import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useInsertOrderItems } from '../api/order-item';
import { useInsertOrder } from '../api/orders';
import { CartItem, Tables } from "../types";

type Product = Tables<'products'>

type CartType = {
       items: CartItem[]
       addItem: (product: Product, size: CartItem['size']) => void
       updateQuantity: (itemId: string, amount: -1 | 1) => void
       total: number
       checkout: () => void
}

const CartContext = createContext<CartType>({
       items: [],
       addItem: () => { },
       updateQuantity: () => { },
       total: 0,
       checkout: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
       const [items, setItems] = useState<CartItem[]>([])

       const { mutate: insertOrder } = useInsertOrder()
       const { mutate: insertOrderItems } = useInsertOrderItems()
       const router = useRouter()
       const addItem = (product: Product, size: CartItem['size']) => {
              const existingItem = items.find(
                     (item) => item.product === product && item.size === size
              )
              if (existingItem) {
                     updateQuantity(existingItem.id, 1)
                     return;
              }
              const newCartItem: CartItem = {
                     id: randomUUID(),
                     product,
                     product_id: product.id,
                     size,
                     quantity: 1

              }
              setItems([newCartItem, ...items])
       }
       const updateQuantity = (itemId: string, amount: -1 | 1) => {
              setItems(items.map((item) => (
                     item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }
              )))
       }
       const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)
       const clearCart = () => {
              setItems([])
       }
       const checkout = () => {
              console.warn('checkout');
              insertOrder({ total }, { onSuccess: saveOrderItems })
       }
       const saveOrderItems = (order: Tables<'orders'>) => {
              const item1 = items[0]
              insertOrderItems({
                     order_id: order.id,
                     product_id: item1.product_id,
                     size: item1.size,
                     quantity: item1.quantity,
              }, {
                     onSuccess() {
                            console.log('====================================');
                            console.log(order);
                            console.log('====================================');
                            clearCart()
                            router.push(`/(user)/orders/${order.id}`)

                     }
              })
       }
       return (
              <CartContext.Provider
                     value={{ items, addItem, updateQuantity, total, checkout }}>
                     {children}
              </CartContext.Provider>
       )
}
export default CartProvider

export const useCart = () => useContext(CartContext)