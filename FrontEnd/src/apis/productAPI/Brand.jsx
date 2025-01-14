import axiosClient from '../AxiosClient'

const getBrandsNoPageAPI = async () => {
  try {
    const data = await axiosClient.get('/Brand/noPaging')
    return data
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}

const getBrandsAPI = async (pageSize, pageNumber, sort, search) => {
  try {
    const params = {}
    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
    if (pageNumber !== null && pageNumber !== undefined)
      params.pageNumber = pageNumber
    if (sort !== null && sort !== undefined) params.sort = sort
    if (search !== null && search !== undefined) params.search = search

    const data = await axiosClient.get('/Brand', { params })
    return data
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}

const getBrandAPI = async (id) => {
  const data = await axiosClient.get(`/Brand/${id}`)
  return data
}

const postBrandAPI = async (payload) => {
  const data = await axiosClient.post('/Brand', payload)
  return data
}

const putBrandAPI = async (payload) => {
  const data = await axiosClient.put(`/Brand/${payload.id}`, payload)
  return data
}

const deleteBrandAPI = async (id) => {
  const data = await axiosClient.delete(`/Brand/${id}`)
  return data
}

export {
  getBrandsNoPageAPI,
  getBrandsAPI,
  getBrandAPI,
  postBrandAPI,
  putBrandAPI,
  deleteBrandAPI,
}
