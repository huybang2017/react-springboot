import AxiosAdmin from '../AxiosAdmin'

export const LogoutAPI = async (payload) => {
  const data = await AxiosAdmin.post('/Auth/Logout', payload)
  return data
}
