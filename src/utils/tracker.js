import api from '../service/api'

const sendTracker = ({ productId, userId }, event) => {
  api.post('/trackers', {
    product: productId,
    event: event,
    users_permissions_user: userId
  }).catch(error => console.log(error))
}

export default sendTracker
