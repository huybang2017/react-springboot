import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProductTypes = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ShoeType/noPaging`); 
  return data;
};

export const useProductTypesQuery = () => {
  return useQuery({
    queryKey: ['productTypes'],  
    queryFn: fetchProductTypes,  
    staleTime: Infinity,   
    cacheTime: Infinity,  
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,   
    refetchOnMount: false, 
  });
};
