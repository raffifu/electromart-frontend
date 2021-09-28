import { subscribe } from '../store'
import setAuthToken from '../../utils/setAuthToken'

subscribe('auth.token', ({ auth }) => {
  setAuthToken(auth.token)
})
