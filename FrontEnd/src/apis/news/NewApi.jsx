import AxiosAdmin from '../AxiosAdmin'
import AxiosClient from '../AxiosClient'

export const getNewsByUserAPI = async (query) => {

  const response = await AxiosClient.get(`/News/User?${query}`)
  return response
}

export const getNewsByAdminAPI = async (payload) => {
  const params = new URLSearchParams()
  if (payload.pageNumber) {
    params.append('pageNumber', payload.pageNumber)
  }
  if (payload.pageSize) {
    params.append('pageSize', payload.pageSize)
  }
  if (payload.sort) {
    params.append('sort', payload.sort)
  }
  if (payload.search) {
    params.append('search', payload.search)
  }
  if (payload.status) {
    params.append('status', payload.status)
  }
  if (payload.from) {
    params.append('from', payload.from)
  }
  if (payload.to) {
    params.append('to', payload.to)
  }
  const response = await AxiosAdmin.get('/News/Admin', { params })
  return response
}

export const getDetailNewByUserAPI = async (payload) => {
  if (!payload.id) {
    return
  }
  const response = await AxiosClient.get(`News/User/${payload.id}`)
  return response
}

export const getDetailNewByAdminAPI = async (payload) => {
  if (!payload.id) {
    return
  }
  const params = new URLSearchParams()
  if (payload.pageNumber) {
    params.append('search', payload.search)
  }
  if (payload.pageSize) {
    params.append('status', payload.status)
  }

  const response = await AxiosAdmin.get(`/News/Admin/${payload.id}`, { params })
  return response
}

export const getHotNewsAPI = async () => {
  const response = AxiosClient.get('/News/HotNews')
  return response
}

export const postNewAPI = async (payload) => {
  const response = AxiosAdmin.post('/News', payload)
  return response.data
}

export const updateNewAPI = async (payload) => {
  const response = await AxiosAdmin.patch('/News', payload)
  return response
}
