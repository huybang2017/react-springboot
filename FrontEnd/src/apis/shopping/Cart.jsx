import axiosAdmin from '../AxiosAdmin'
export const getCartItem = async (id) => {
  const response = await axiosAdmin.get(`/CartItem/${id}`)
  return response
}

export const postCartItem = async (payload) => {
  const response = await axiosAdmin.post('/CartItem', payload)
  return response
}

export const putCartItem = async (payload) => {
  const response = await axiosAdmin.patch(`/CartItem`, payload)
  return response.data
}

export const deleteCartItem = async (payload) => {
  const response = await axiosAdmin.delete(`/CartItem`, { data: payload })
  return response.data
}

export const deleteAllCartItem = async (payload) => {
  const response = await axiosAdmin.delete(`/CartItem/${payload}`)
  return response
}
