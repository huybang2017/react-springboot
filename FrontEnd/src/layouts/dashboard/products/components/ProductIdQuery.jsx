import qs from 'query-string'
import AxiosAdmin from '../../../../apis/AxiosAdmin'
import { useQuery } from '@tanstack/react-query';






export const ProductIdQuery = (queryKey) => {

    const queryString = qs.stringifyUrl({
        url: `/Shoe/Admin/${queryKey}`,
    })



    return useQuery({
        queryKey: ["productId", queryKey],
        queryFn: async () => {
            const { data } = await AxiosAdmin.get(queryString);
            return data;
        },
        staleTime: false
    })
}