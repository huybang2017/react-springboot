import axiosClient from '../AxiosClient.jsx'
import AxiosAdmin from '../AxiosAdmin.jsx'

const GetAllVochers = async (
  pageSize,
  sort,
  search,
  maxPrice,
  status,
  minSize,
  maxSize,
) => {
  const params = {}

  if (pageSize !== null || pageSize !== undefined) params.pageSize = pageSize
  if (sort !== null || sort !== undefined) params.sort = sort
  if (search !== null || search !== undefined) params.search = search
  if (maxPrice !== null || maxPrice !== undefined) params.maxPrice = maxPrice
  if (status !== null || status !== undefined) params.status = status
  if (minSize !== null || minSize !== undefined) params.minSize = minSize
  if (maxSize !== null || maxSize !== undefined) params.maxSize = maxSize
  const data = await axiosClient.get('/Voucher/Admin', { params })
  return data
}

const GetAllVochersClientAPI = async () => {
  const data = await axiosClient.get('/Voucher/User')
  return data
}

const GetVoucherByCodeAPI = async (code) => {
  const params = new URLSearchParams()
  params.append('code', code)
  const data = await AxiosAdmin.get(`/Voucher`, { params })
  return data
}

export { GetAllVochers, GetAllVochersClientAPI, GetVoucherByCodeAPI }
