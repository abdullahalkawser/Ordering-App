import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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



// insert data 
export const insertData = () => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const { error,data:newData } = await supabase
        .from("products")
        .insert(
          {
            name: data.name,
            price: data.price,
            image: data.image,
          },
        ).single()

      if (error) throw new Error(error.message);
      return newData;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};



// insert data 
export const UpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return updatedProduct;
    },

    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
    },
  });
};


// delete data 

export const DeleteData = () => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {

      await supabase.from('products').delete().eq('id',id)

    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

