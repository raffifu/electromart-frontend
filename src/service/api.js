import axios from 'axios'
import { backendUrl } from '../constants'

const api = axios.create({
  baseURL: `${backendUrl}/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
