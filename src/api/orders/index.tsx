import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseadminorderList = ({archived=false})=>{
  const statusses = archived ? ['Delivered'] : ['New','Cooking','Delivering']
    return  useQuery({
        queryKey: ['order',{archived}],
        queryFn: async () => {
          const { data, error } = await supabase.from("order").select("*").in('status',statusses);
          if (error) throw new Error(error.message);
          return data;
        },
      });
}



export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['order', { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('order')
        .select('*')
        .eq('user_id', id)
        // .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;

    },
  });
};




export const Useorderdetails = (id: number)=>{

  return  useQuery({
      queryKey: ['order',id],
      queryFn: async () => {
        const { data, error } = await supabase.from("order").select("*").eq('id',id).single();
        if (error) throw new Error(error.message);
        return data;
      },
    });
}





export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('order')
        .insert({ ...data, user_id: userId })
        .select()


      if (error) {
        
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};
