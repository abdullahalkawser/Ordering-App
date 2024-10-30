import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const UseProductList = ()=>{
    return  useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const { data, error } = await supabase.from("products").select("*");
          if (error) throw new Error(error.message);
          return data;
        },
      });
}

export const UseProduct = (id: number)=>{
    return  useQuery({
        queryKey: ['products',id],
        queryFn: async () => {
          const { data, error } = await supabase.from("products").select("*").eq('id',id).single();
          if (error) throw new Error(error.message);
          return data;
        },
      });
}