import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchProductBrands = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/Brand/noPaging`)
    return data;
}

export const useProductBrandsQuery = ()=> {
    return useQuery({
        queryKey: ['productBrands'],
        queryFn: fetchProductBrands,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false
    })
}