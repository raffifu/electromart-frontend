import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { Link as RouteLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux/reducer/authSlice'

import { useState } from 'react'

function Login ({ isAuthenticated, login }) {
  if (isAuthenticated) return <Redirect to="/" />

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submit = () => login(formData)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={onChange} type="text" name="identifier" value={formData.identifier} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={onChange} type="password" name="password" value={formData.password} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Stack spacing={2}>
                <Button
                  onClick={submit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500'
                  }}>
                  Sign in
                </Button>
                <Link as={RouteLink} to='/register' color={'blue.400'}>Do not have an account? Register now</Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps, { login })(Login)
