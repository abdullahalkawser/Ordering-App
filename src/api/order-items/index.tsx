import { supabase } from "@/lib/supabase";
import { OrderItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderitem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderItem) => {
      const { error, data: newProduct } = await supabase
        .from('order_item')
        .insert(data)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },

  });
};
