import AxiosClient from '../AxiosClient'

export const ResetPassword = async (payload) => {
  const response = await AxiosClient.patch('/Auth/ResetPassword', payload)
  return response
}
