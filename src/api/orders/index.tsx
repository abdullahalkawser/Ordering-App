import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

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