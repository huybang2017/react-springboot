import qs from 'query-string'
import { useQuery } from '@tanstack/react-query'
import AxiosAdmin from '../../../../apis/AxiosAdmin'



export const NewIdQuery = (queryKey) => {

    const queryString = qs.stringifyUrl({
        url: `/News/Admin/${queryKey}`,
    })




    return useQuery({
        queryKey: ["newId", queryKey],
        queryFn: async () => {
            const { data } = await AxiosAdmin.get(queryString);
            return data;
        },
        staleTime: false
    })
}