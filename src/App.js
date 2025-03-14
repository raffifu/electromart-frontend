import 'react-toastify/dist/ReactToastify.css'

import { ChakraProvider, theme } from '@chakra-ui/react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

// component
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// pages
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'

import { setAuthToken } from './utils'

import { store } from './redux/store'
import { loadUser } from './redux/reducer/authSlice'

import PrivateRoute from './routing/PrivateRoute'

// routes
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import addressRoutes from './routes/addressRoutes'

function App () {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  store.dispatch(loadUser())

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ToastContainer autoClose={3000} hideProgressBar pauseOnHover={false} />
        <Switch>
          <Route path="/login">
            <Navbar />
            <Login />
            <Footer />
          </Route>
          <Route path="/register">
            <Navbar />
            <Register />
            <Footer />
          </Route>
          {/* Private Routes */}
          <PrivateRoute path="/ProfilePage" component={ProfilePage} />
          {productRoutes.map(route => {
            if (route.type === 'private') {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  allowedRoles={route.allowedRoles}
                />
              )
            }
            const { component: Component } = route
            return (
              <Route
                key={route.path}
                path={route.path}
                render={props => <Component {...props} />}
              />
            )
          })}

          {cartRoutes.map(route => {
            if (route.type === 'private') {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  allowedRoles={route.allowedRoles}
                />
              )
            }
            const { component: Component } = route
            return (
              <Route
                key={route.path}
                path={route.path}
                render={props => <Component {...props} />}
              />
            )
          })}

          {addressRoutes.map(route => {
            if (route.type === 'private') {
              return (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  allowedRoles={route.allowedRoles}
                />
              )
            }
            const { component: Component } = route
            return (
              <Route
                key={route.path}
                path={route.path}
                render={props => <Component {...props} />}
              />
            )
          })}
          <Route path="/dashboard"></Route>
          <Route path="/">
            <Navbar />
            <Hero />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
