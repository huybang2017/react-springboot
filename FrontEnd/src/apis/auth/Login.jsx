import AxiosClient from '../AxiosClient'

const loginByAdmin = async (user) => {
  const formData = new FormData()
  Object.keys(user).forEach((key) => formData.append(key, user[key]))

  const data = await AxiosClient.post('/Auth/LoginAdmin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

const loginByUser = async (user) => {
  const formData = new FormData()
  Object.keys(user).forEach((key) => formData.append(key, user[key]))
  const data = await AxiosClient.post('/Auth/SignIn', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export { loginByAdmin, loginByUser }
