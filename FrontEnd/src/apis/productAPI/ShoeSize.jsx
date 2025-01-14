import axiosClient from '../AxiosClient'

const getShoeSizesAPI = async () => {
  const data = await axiosClient.get('/ShoeSize')
  return data
}

const getShoeSizeAPI = async (id) => {
  const data = await axiosClient.get(`/ShoeSize/${id}`)
  return data
}

const postShoeSizeAPI = async (payload) => {
  const data = await axiosClient.post('/ShoeSize', payload)
  return data
}

const putShoeSizeAPI = async (payload) => {
  const data = await axiosClient.put(`/ShoeSize/${payload.id}`, payload)
  return data
}

const deleteShoeSizeAPI = async (id) => {
  const data = await axiosClient.delete(`/ShoeSize/${id}`)
  return data
}

export {
  getShoeSizeAPI,
  getShoeSizesAPI,
  postShoeSizeAPI,
  putShoeSizeAPI,
  deleteShoeSizeAPI,
}
