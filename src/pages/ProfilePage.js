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

export default function SocialProfileWithImage () {
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
                Seller1
              </Heading>
              <Text color={'gray.500'}>Seller</Text>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'left'}>
                <Text fontWeight={600}>Name:</Text>
                <Text fontWeight={600}>Gender:</Text>
                <Text fontWeight={600}>Birth Date:</Text>
                <Text fontWeight={600}>Email:</Text>
                <Text fontWeight={600}>Phone Number:</Text>
              </Stack>
              <Stack spacing={0} align={'right'}>
                <Text fontWeight={600}>Daffa Nafis Sing Bagus</Text>
                <Text fontWeight={600}>Male</Text>
                <Text fontWeight={600}>11 September 2001</Text>
                <Text fontWeight={600}>Daffanafis01@mail.ugm.ac.id</Text>
                <Text fontWeight={600}>081211090012</Text>
              </Stack>
            </Stack>

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
              }}>
              My Products
            </Button>
            <Button
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
