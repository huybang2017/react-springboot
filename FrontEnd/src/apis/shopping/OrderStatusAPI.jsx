import AxiosAdmin from '../AxiosAdmin'

export const createOrderStatusCartByAdmin = async (payload) => {
  const reponse = await AxiosAdmin.post('/OrderStatus/Admin', payload)
  return reponse
}
export const createOrderStatusCartByUser = async (payload) => {
  const reponse = await AxiosAdmin.post('/OrderStatus/User', payload)
  return reponse
}
