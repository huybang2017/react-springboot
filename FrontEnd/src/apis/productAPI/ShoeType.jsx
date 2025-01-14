import AxiosAdmin from '../AxiosAdmin'
import axiosClient from '../AxiosClient'

const getShoeTypesNoPageAPI = async () => {
  try {
    const data = await axiosClient.get('/ShoeType/noPaging')
    return data
  } catch (error) {
    console.error('Error fetching shoe types:', error)
    throw error
  }
}

const getShoeTypesAPI = async (pageSize, pageNumber, sort, search) => {
  const params = {}
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (sort !== null && sort !== undefined) params.sort = sort
  if (search !== null && search !== undefined) params.search = search
  try {
    const data = await axiosClient.get('/ShoeType', { params })
    return data
  } catch (error) {
    console.error('Error fetching shoe types:', error)
    throw error
  }
}

const getShoeTypeAPI = async (id) => {
  const data = await axiosClient.get(`/ShoeSize/${id}`)
  return data
}

const postShoeTypeAPI = async (payload) => {
  const data = await AxiosAdmin.post('/ShoeType', payload)
  return data
}

const putShoeTypeAPI = async (payload) => {
  const data = await axiosClient.put(`/ShoeSize/${payload.id}`, payload)
  return data
}

const deleteShoeTypeAPI = async (id) => {
  const data = await axiosClient.delete(`/ShoeSize/${id}`)
  return data
}

export {
  getShoeTypesNoPageAPI,
  getShoeTypesAPI,
  getShoeTypeAPI,
  postShoeTypeAPI,
  putShoeTypeAPI,
  deleteShoeTypeAPI,
}
