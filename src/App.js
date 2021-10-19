import 'react-toastify/dist/ReactToastify.css'

import {
  ChakraProvider,
  theme
} from '@chakra-ui/react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

// component
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// pages
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import MyProduct from './pages/seller/MyProduct'

import setAuthToken from './utils/setAuthToken'

import { store } from './redux/store'
import { loadUser } from './redux/reducer/authSlice'

import PrivateRoute from './routing/PrivateRoute'

function App () {
  if (localStorage.token) { setAuthToken(localStorage.token) }

  store.dispatch(loadUser())

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          pauseOnHover={false}
          />
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>]
          <PrivateRoute path="/ProfilePage" component={ProfilePage}/>
          <PrivateRoute path="/MyProduct" component={MyProduct}/>
          <Route path="/dashboard">

          </Route>
          <Route path="/">
            <Navbar/>
            <Hero/>
            <Footer/>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
