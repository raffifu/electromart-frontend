import {
  ChakraProvider,
  theme
} from '@chakra-ui/react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// component
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// pages
import Login from './pages/Login'
import Register from './pages/Register'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <Router>
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
