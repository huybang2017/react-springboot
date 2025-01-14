import AxiosAdmin from '../AxiosAdmin'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const getListOrderByAdmin = async (payload) => {
  const params = new URLSearchParams()

  if (payload.pageSize) {
    params.append('pageSize', payload.pageSize)
  }
  if (payload.pageNumber) {
    params.append('pageNumber', payload.pageNumber)
  }
  if (payload.status && payload.status !== 'Tất cả') {
    params.append('status', payload.status)
  }
  if (payload.search) {
    params.append('search', payload.search)
  }
  if (payload.sort) {
    params.append('sort', payload.sort)
  }
  if (payload.type && payload.type !== 'Tất cả') {
    params.append('type', payload.type)
  }
  if (payload.from) {
    const formattedFrom = formatDate(payload.from)

    params.append('from', formattedFrom)
  }
  if (payload.to) {
    const formattedTo = formatDate(payload.to)
    params.append('to', formattedTo)
  }

  const response = await AxiosAdmin.get('/Order/Admin', { params })
  return response
}

export const getListOrderByUser = async () => {
  try {
    const response = await AxiosAdmin.get('/Order/MyOrder')
    return response
  } catch (error) {
    console.log('Failed to get list order by admin: ', error)
  }
}

export const getDetailOrderByAdmin = async (id) => {
  const response = await AxiosAdmin.get(`/Order/Admin/${id}`)
  return response
}

export const getDetailOrderByUser = async (id) => {
  try {
    const response = await AxiosAdmin.get(`/Order/MyOrder/${id}`)
    return response
  } catch (error) {
    console.log('Failed to get detail order by user: ', error)
    throw error
  }
}

export const postOrderByAdmin = async (payload) => {
  try {
    const response = await AxiosAdmin.post('/Order/Admin', payload)
    return response
  } catch (error) {
    console.log('Failed to add order by admin: ', error)
    throw error
  }
}

export const postOrderByUser = async (payload) => {
  const response = await AxiosAdmin.post('/Order/User', payload)
  return response
}

export const putOrder = async (id, payload) => {
  try {
    const response = await AxiosAdmin.put(`/Order/${id}`, payload)
    return response
  } catch (error) {
    console.log('Failed to update order by admin: ', error)
    throw error
  }
}
