import axios from 'axios'

const api = axios.create({
  baseURL: 'https://electromart-be.an0nvi.xyz/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
