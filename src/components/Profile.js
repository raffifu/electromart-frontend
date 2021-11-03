import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Link,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

import ShowAddress from './Address/ShowAddress'

import { ROLES } from '../constants'
import { logout } from '../redux/reducer/authSlice'
import { getCustomerAddressByUserId } from '../redux/reducer/customerAddressSlice'
import { getSellerAddressByUserId } from '../redux/reducer/sellerAddressSlice'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect } from 'react'

function Profile ({
  user,
  customerAddress,
  sellerAddress,
  logout,
  getCustomerAddressByUserId,
  getSellerAddressByUserId
}) {
  const history = useHistory()

  useEffect(async () => {
    if (user.role.id === ROLES.CUSTOMER) {
      await getCustomerAddressByUserId(user.id)
    }
    if (user.role.id === ROLES.SELLER) await getSellerAddressByUserId(user.id)
  }, [user])

  const addresses =
    user.role.id === ROLES.CUSTOMER
      ? customerAddress.listCustomerAddresss
      : sellerAddress.listSellerAddresss

  const linkAddAddress =
    user.role.id === ROLES.CUSTOMER
      ? '/AddCustomerAddress'
      : '/AddSellerAddress'
  const linkManageAddress =
    user.role.id === ROLES.CUSTOMER ? '/CustomerAddress' : '/SellerAddress'

  const primaryAddress = addresses.filter(addr => addr.primary)[0]
  return (
    <Center py={0}>
      <Box
        maxW={'full'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'0xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image h={'200px'} w={'full'} color="white" objectFit={'cover'} />
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
              {primaryAddress && <Text fontWeight={600}>Primary Address</Text>}
            </Stack>
            <Stack spacing={0} align={'right'}>
              <Text fontWeight={600}>
                {user.firstName} {user.lastName}
              </Text>
              <Text fontWeight={600}>{user.email}</Text>
              <Link color="blue.400" href={linkManageAddress}>
                Manage Addresses
              </Link>
            </Stack>
          </Stack>
          <Center>
            {primaryAddress
              ? (
              <ShowAddress
                latitude={primaryAddress.latitude}
                longitude={primaryAddress.longitude}
                text="Rumah saya ada di sini"
                height="360px"
                width="480px"
              />
                )
              : (
              <Text marginTop="24px" color="tomato">
                You do not have address, please input one here{' '}
                <Link color="blue.400" href={linkAddAddress}>
                  here
                </Link>
              </Text>
                )}
          </Center>

          {user.role.id === ROLES.SELLER && (
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
              onClick={() => history.push('/MyProduct')}
            >
              My Products
            </Button>
          )}
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
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Center>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  customerAddress: state.customerAddress,
  sellerAddress: state.sellerAddress
})

export default connect(mapStateToProps, {
  logout,
  getCustomerAddressByUserId,
  getSellerAddressByUserId
})(Profile)
