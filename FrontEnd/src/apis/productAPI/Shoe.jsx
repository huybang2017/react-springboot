import axiosAdmin from '../AxiosAdmin.jsx'
import axiosClient from '../AxiosClient.jsx'

const getShoesAPI = async (
  pageSize,
  pageNumber,
  sort,
  minPrice,
  search,
  maxPrice,
  brandId,
  shoeTypeId,
  size,
  listShoeColorId,
) => {
  const params = new URLSearchParams()

  if (pageSize !== null && pageSize !== undefined)
    params.append('pageSize', pageSize)
  if (pageNumber !== null && pageNumber !== undefined)
    params.append('pageNumber', pageNumber)
  if (sort !== null && sort !== undefined) params.append('sort', sort)
  if (search !== null && search !== undefined) {
    params.append('search', search)
  } else {
    params.append('search', '')
  }
  if (maxPrice !== null && maxPrice !== undefined)
    params.append('maxPrice', maxPrice)
  if (minPrice !== null && minPrice !== undefined)
    params.append('minPrice', minPrice)
  if (brandId !== null && brandId !== undefined)
    params.append('brandId', brandId)
  if (shoeTypeId !== null && shoeTypeId !== undefined)
    params.append('shoeTypeId', shoeTypeId)
  if (size !== null && size !== undefined) params.append('size', size)
  if (listShoeColorId && Array.isArray(listShoeColorId)) {
    listShoeColorId.forEach((colorId) => {
      params.append('listShoeColorId', colorId)
    })
  }

  const data = await axiosClient.get('/Shoe/CommonUser', { params })
  return data
}

const getShoeAPI = async (id) => {
  const data = await axiosClient.get(`/Shoe/CommonUser/${id}`)
  return data
}

const getShoesAdminAPI = async (
  pageNumber,
  pageSize,
  sort,
  status,
  brandId,
  shoeTypeId,
  priority,
  search,
  minCreateDate,
  maxCreateDate,
) => {
  const params = {}

  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (sort !== null && sort !== undefined) params.sort = sort
  if (status !== null && status !== undefined) params.status = status
  if (brandId !== null && brandId !== undefined) params.brandId = brandId
  if (shoeTypeId !== null && shoeTypeId !== undefined)
    params.shoeTypeId = shoeTypeId
  if (priority !== null && priority !== undefined) params.priority = priority
  if (search !== null && search !== undefined) params.search = search
  if (minCreateDate !== null && minCreateDate !== undefined)
    params.minCreateDate = minCreateDate
  if (maxCreateDate !== null && maxCreateDate !== undefined)
    params.maxCreateDate = maxCreateDate

  const data = await axiosAdmin.get('/Shoe/Admin', { params })
  return data
}

const postShoeAPI = async (shoe) => {
  const data = await axiosAdmin.post('/Shoe', shoe)
  return data
}

const putShoeAPI = async (shoe) => {
  const data = await axiosClient.put(`/shoes/${shoe.id}`, shoe)
  return data
}

const deleteShoeAPI = async (id) => {
  const data = await axiosClient.delete(`/shoes/${id}`)
  return data
}

const getShoesForHomeAPI = async (payload) => {
  const params = new URLSearchParams()
  if (params.pageSize) params.append('pageSize', payload.pageSize)
  if (params.pageNumber) params.append('pageNumber', payload.pageNumber)
  const data = await axiosClient.get('/Shoe/Home', { params })
  return data
}

export {
  getShoesForHomeAPI,
  getShoesAPI,
  getShoeAPI,
  postShoeAPI,
  putShoeAPI,
  deleteShoeAPI,
  getShoesAdminAPI,
}
