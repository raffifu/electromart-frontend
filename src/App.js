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

import setAuthToken from './utils/setAuthToken'

import { store } from './redux/store'
import { loadUser } from './redux/reducer/authSlice'

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
          </Route>
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
