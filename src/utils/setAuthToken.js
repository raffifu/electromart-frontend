import api from '../service/api'

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`
    localStorage.setItem('token', token)
  } else {
    delete api.defaults.headers.common.Authorization
    localStorage.removeItem('token')
  }
}

export default setAuthToken
