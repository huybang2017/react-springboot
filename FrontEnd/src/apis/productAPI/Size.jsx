import AxiosClient from '../AxiosClient'

export const getSizeMenu = async () => {
  const reponse = await AxiosClient.get('/Shoe/CommonUser/sizeFilter')
  return reponse
}
