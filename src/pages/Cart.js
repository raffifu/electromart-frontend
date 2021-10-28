import {
  Heading,
  Center,
  // Image,
  // Flex,
  Text,
  Stack,
  Box,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

function Cart ({ product }) {
  return (
      <Center>
        <Stack
          rounded={'md'}
          overflow={'hidden'}>

          <Stack
          mb={5}
          p={6}
          spacing={6}
          align="stretch">
            <Text fontSize={'3xl'} fontWeight={500} fontFamily={'body'}>
              Your Shopping Cart
            </Text>

            <Box
            p={4}
            width={750}
            boxShadow={'md'}
            direction={'row'}
            justify={'left'}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>Productname</Heading>
              <Text mt={1}>price</Text>
            </Box>

            <Box
            p={4}
            width={750}
            boxShadow={'md'}
            bg={useColorModeValue('blue.50')}
            direction={'row'}
            justify={'left'}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>Total Price</Heading>
              <Text mt={1}>price</Text>
            </Box>

            <Button
              w={250}
              display={'block'}
              margin={'auto'}
              mt={8}
              mb={2}
              bg={useColorModeValue('green.400', 'green.800')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}>
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Center>
  )
}

export default (Cart)
