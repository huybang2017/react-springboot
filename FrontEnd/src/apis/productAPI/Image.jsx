import axiosClient from '../AxiosClient'

const getImagesAPI = async () => {
  const data = await axiosClient.get('/images')
  return data
}

const getImageAPI = async (id) => {
  const data = await axiosClient.get(`/images/${id}`)
  return data
}

const postImageAPI = async (payload) => {
  const data = await axiosClient.post('/images', payload)
  return data
}

const putImageAPI = async (payload) => {
  const data = await axiosClient.put(`/images/${payload.id}`, payload)
  return data
}

const deleteImageAPI = async (id) => {
  const data = await axiosClient.delete(`/images/${id}`)
  return data
}

export { getImagesAPI, getImageAPI, postImageAPI, putImageAPI, deleteImageAPI }
