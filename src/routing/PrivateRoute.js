import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Center, Spinner } from '@chakra-ui/react'

import { ROLES } from '../constants'

const PrivateRoute = ({
  component: Component,
  allowedRoles,
  isAuthenticated,
  user,
  loading,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading
        ? (
        <Center w="100vw" h="100vh">
            <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            />
        </Center>
          )
        : isAuthenticated && allowedRoles.includes(user.role.id)
          ? (<Component {...props} />)
          : (
        <Redirect to="/login" />
            )
    }
  />
)

PrivateRoute.defaultProps = {
  allowedRoles: [ROLES.SELLER, ROLES.CUSTOMER]
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(PrivateRoute)
