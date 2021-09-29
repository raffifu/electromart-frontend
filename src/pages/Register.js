import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  RadioGroup,
  Radio,
  useColorModeValue
} from '@chakra-ui/react'

import { useState } from 'react'

import {
  Link as RouteLink,
  Redirect
} from 'react-router-dom'

import { register } from '../redux/reducer/authSlice'
import { store } from '../redux/store'
import { connect } from 'react-redux'

function Register ({ isAuthenticated }) {
  if (isAuthenticated) return <Redirect to="/" />

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    role: ''
  })

  const onChange = (e) => {
    if (typeof e === 'string') setFormData({ ...formData, role: e })
    else { setFormData({ ...formData, [e.target.name]: e.target.value }) }
  }

  const submit = async () => {
    store.dispatch(register(formData))
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Register</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            We are waiting for you.. ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName">
              <Input onChange={onChange} type="text" name="firstName" value={formData.firstName} placeholder="First Name" />
            </FormControl>
            <FormControl id="lastName">
              <Input onChange={onChange} type="text" name="lastName" value={formData.lastName} placeholder="Last Name"/>
            </FormControl>
            <FormControl id="username">
              <Input onChange={onChange} type="text" name="username" value={formData.username} placeholder="Username"/>
            </FormControl>
            <FormControl id="email">
              <Input onChange={onChange} type="text" name="email" value={formData.email} placeholder="Email address"/>
            </FormControl>
            <FormControl id="password">
              <Input onChange={onChange} type="password" name="password" value={formData.password} placeholder="Password"/>
            </FormControl>
              <RadioGroup onChange={onChange} value={formData.role} name="role">
                <Stack direction="row">
                  <Radio value="3">Seller</Radio>
                  <Radio value="4">Consumer</Radio>
                </Stack>
              </RadioGroup>
            <Stack spacing={2}>
              <Button
                onClick={submit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}>
                Sign up
              </Button>
                <Link as={RouteLink} to='/login' color={'blue.400'}>Already have an account?</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(Register)
