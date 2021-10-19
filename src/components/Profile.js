import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

import { ROLES } from '../constants/roles'
import { logout } from '../redux/reducer/authSlice'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

function Profile ({ user, logout }) {
  const history = useHistory()
  return (
      <Center py={0}>
        <Box
          maxW={'full'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'0xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'200px'}
            w={'full'}
            color ='white'
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
              }
              alt={'Author'}
              css={{
                border: '2px solid white'
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user.username}
              </Heading>
              <Text color={'gray.500'}>{user.role.name}</Text>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'left'}>
                <Text fontWeight={600}>Name:</Text>
                <Text fontWeight={600}>Email:</Text>
                <Text fontWeight={600}>Address:</Text>
              </Stack>
              <Stack spacing={0} align={'right'}>
                <Text fontWeight={600}>{user.firstName} {user.lastName}</Text>
                <Text fontWeight={600}>{user.email}</Text>
                <Text fontWeight={600}>{user.address}</Text>
              </Stack>
            </Stack>

            {
              user.role.id === ROLES.SELLER && (
                <Button
                  w={250}
                  display={'block'}
                  margin={'auto'}
                  mt={8}
                  mb={2}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  onClick = {() => history.push('/MyProduct')}
                  >
                  My Products
                </Button>
              )
            }
            <Button
              onClick={logout}
              w={250}
              display={'block'}
              margin={'auto'}
              mt={8}
              mb={2}
              bg={useColorModeValue('red.500', 'red.800')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}>
              Log Out
            </Button>
          </Box>
        </Box>
      </Center>
  )
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps, { logout })(Profile)
