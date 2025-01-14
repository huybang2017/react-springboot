import AxiosClient from '../AxiosClient'

export const GetKeyPassword = async (payload) => {
  const params = new URLSearchParams()
  params.append('email', payload.email)
  const response = await AxiosClient.get('/Auth/GetKeyForResetPassword', {
    params,
  })
  return response
}
