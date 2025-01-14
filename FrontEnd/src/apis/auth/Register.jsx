import AxiosClient from '../AxiosClient'

export const registerUser = async (payload) => {
  const data = await AxiosClient.post('/Auth/Registration', payload)
  return data
}
