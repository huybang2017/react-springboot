import AxiosAdmin from '../AxiosAdmin'

export const RefreshTokenAPI = (payload) => {
  const response = AxiosAdmin.post('/Auth/Refresh', payload)
  return response
}
