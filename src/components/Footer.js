import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue
} from '@chakra-ui/react'

const ListHeader = ({ children }) => {
  return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
  )
}

export default function Footer () {
  return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <Link href={'#'}>Overview</Link>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <Link href={'#'}>Features</Link>
                <Tag
                  size={'sm'}
                  bg={useColorModeValue('blue.300', 'blue.800')}
                  ml={2}
                  color={'white'}>
                  New
                </Tag>
              </Stack>
              <Link href={'#'}>Tutorials</Link>
              <Link href={'#'}>Pricing</Link>
              <Link href={'#'}>Releases</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <Link href={'#'}>About Us</Link>
              <Link href={'#'}>Press</Link>
              <Link href={'#'}>Careers</Link>
              <Link href={'#'}>Contact Us</Link>
              <Link href={'#'}>Partners</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Legal</ListHeader>
              <Link href={'#'}>Cookies Policy</Link>
              <Link href={'#'}>Privacy Policy</Link>
              <Link href={'#'}>Terms of Service</Link>
              <Link href={'#'}>Law Enforcement</Link>
              <Link href={'#'}>Status</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Follow Us</ListHeader>
              <Link href={'#'}>Facebook</Link>
              <Link href={'#'}>Twitter</Link>
              <Link href={'#'}>Dribbble</Link>
              <Link href={'#'}>Instagram</Link>
              <Link href={'#'}>LinkedIn</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8
            }}>
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2021 Electro Mart. All rights reserved
          </Text>
        </Box>
      </Box>
  )
}
