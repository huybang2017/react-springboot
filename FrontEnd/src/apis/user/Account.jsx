import AxiosAdmin from '../AxiosAdmin'
import AxiosClient from '../AxiosClient'

// const getAccountByAdmin = async (
//     pageSize,
//     pageNumber,
//     sort,
//     status,
//     role,
//     from,
//     to,
// ) => {
//     const params = {};
//     if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
//     if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
//     if (sort !== null && sort !== undefined) params.sort = sort;
//     if (status !== null && status !== undefined) params.status = status;
//     if (role !== null && role !== undefined) params.role = role;
//     if (from !== null && from !== undefined) params.from = from;
//     if (to !== null && to !== undefined) params.to = to;

//     try {
//         const data = await AxiosAdmin.get('/Account', { params });
//         return data;
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         throw error;
//     }
// };

// Get users with pagination, sorting, and search
const getAccountsAPI = async (pageSize, pageNumber, sort, search) => {
  const params = {}
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (sort !== null && sort !== undefined) params.sort = sort
  if (search !== null && search !== undefined) params.search = search

  try {
    const data = await AxiosAdmin.get('/Account', { params })
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Get a single user by ID
const getAccountAndUserInformationByIdAPI = async (id) => {
  const data = await AxiosAdmin.get(`/Account/${id}`)
  return data
}

const updateAccountInformationUserAPI = async (payload) => {
  const data = await AxiosAdmin.patch('/Account/UpdateInformation', payload)
  return data
}

// Update an existing user
const putAccountAPI = async (account) => {
  try {
    // Create a FormData object
    const formData = new FormData()
    formData.append('accountId', account.accountId)
    formData.append('status', account.status)

    // Make the PUT request with form-data
    const response = await AxiosAdmin.patch('/Account/ChangeStatus', formData)

    return response // Ensure response data is returned
  } catch (error) {
    console.error('Error updating account status:', error)
    throw new Error('Error updating account status')
  }
}

const getTokenUdpatePasswordAPI = async () => {
  const response = await AxiosAdmin.get(`/Account/GetKeyForUpdatePassword`)
  return response
}

const updatePasswordAPI = async (payload) => {
  const response = await AxiosAdmin.patch(`/Account/NewPassword`, payload)
  return response
}

const getTokenUpdateEmailAPI = async (newEmail) => {
  const params = new URLSearchParams()
  params.append('newEmail', newEmail)

  const response = await AxiosAdmin.get(`/Account/GetKeyForUpdateEmail`, {
    params,
  })

  return response
}

const updateEmailAPI = async (payload) => {
  const response = await AxiosAdmin.patch(`/Account/NewEmail`, payload)
  return response
}

const checkEmailAPI = async (email) => {
  const response = await AxiosClient.get(`Account/isThisEmailExists`, {
    params: { email },
  })
  return response
}

export {
  getAccountsAPI,
  getAccountAndUserInformationByIdAPI,
  putAccountAPI,
  updateAccountInformationUserAPI,
  getTokenUdpatePasswordAPI,
  updatePasswordAPI,
  getTokenUpdateEmailAPI,
  updateEmailAPI,
  checkEmailAPI,
}
