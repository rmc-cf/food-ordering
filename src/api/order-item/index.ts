import { supabase } from "@/src/lib/supabase"
import { InsertTables } from "@/src/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useInsertOrderItems= () => {
       const queryClient = useQueryClient()
       return useMutation({
              async mutationFn(data:InsertTables<'order-items'>){
                     const {error,data:newProduct} = await supabase
                     .from("order_items")
                     .insert({...data})
                     .select()
                     .single()
                     if(error){
                            throw new Error(error.message)
                     }
                     console.log('====================================');
                     console.log(newProduct);
                     console.log('====================================');
                     return newProduct;
              },
              async onSuccess(){
                     await queryClient.invalidateQueries({queryKey:['products'] })
              },
       })
}