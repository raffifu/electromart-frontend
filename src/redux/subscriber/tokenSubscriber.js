import { subscribe } from '../store'
import { setAuthToken } from '../../utils'

subscribe('auth.token', ({ auth }) => {
  setAuthToken(auth.token)
})
