

import qs from 'query-string'
import AxiosAdmin from '../../../../apis/AxiosAdmin';
import { useQuery } from '@tanstack/react-query';





export const NewsQuery = (params) => {

    const queryString = qs.stringifyUrl({
        url: '/News/Admin',
        query: params
    })


    return useQuery({
        queryKey: ["news", params],
        queryFn: async () => {
            const { data } = await AxiosAdmin.get(queryString);
            return data;
        },
        staleTime: false
    })
}