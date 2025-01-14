import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchProductColors = async ()=>{
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Color/noPaging`)
    return data;
}



export const useProductColorsQuery = ()=> {
    return useQuery({
        queryKey:['productColors'],
        queryFn: fetchProductColors,
        staleTime: Infinity,
        cachedTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}