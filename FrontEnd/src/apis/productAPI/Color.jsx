import axiosClient from '../AxiosClient'

const getColorsNoPageAPI = async () => {
  const data = await axiosClient.get('/Color/noPaging')
  return data
}

const getColorsAPI = async (pageSize, pageNumber, sort, search) => {
  const params = URLSearchParams()
  params.append('pageSize', pageSize)
  params.append('pageNumber', pageNumber)
  params.append('sort', sort)
  if (search) {
    params.append('search', search)
  }
  const data = await axiosClient.get('/Color', { params })
  return data
}

const getColorAPI = async (id) => {
  const data = await axiosClient.get(`/Color/${id}`)
  return data
}

const postColorAPI = async (payload) => {
  const data = await axiosClient.post('/Color', payload)
  return data
}

const putColorAPI = async (payload) => {
  const data = await axiosClient.put(`/Color/${payload.id}`, payload)
  return data
}

const deleteColorAPI = async (id) => {
  const data = await axiosClient.delete(`/Color/${id}`)
  return data
}

export {
  getColorsNoPageAPI,
  getColorsAPI,
  getColorAPI,
  postColorAPI,
  putColorAPI,
  deleteColorAPI,
}
