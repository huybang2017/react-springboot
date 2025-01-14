import qs from 'query-string'
import AxiosAdmin from '../../../../apis/AxiosAdmin'
import { useQuery } from '@tanstack/react-query'






export const ProductQuery = (params) => {

    const queryString = qs.stringifyUrl({
        url: '/Shoe/Admin',
        query: params
    })


    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const { data } = await AxiosAdmin.get(queryString);
            return data;
        },
        staleTime: false
    })
}