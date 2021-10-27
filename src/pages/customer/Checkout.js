import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  Container
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import {
  Address,
  DetailCheckout,
  Logistic,
  Payment
} from '../../components/Checkout'

import Navbar from '../../components/Navbar'

const Checkout = () => (
  <>
  <Navbar/>
    <Box backgroundColor="#ffffff">
      <Container>
        <Heading size="lg" pt={4} pb={4}>
          Checkout
        </Heading>
        <Stack spacing={2}>
          <Address/>
          <DetailCheckout/>
          <Logistic/>
          <Payment/>
        </Stack>
        <Flex justifyContent="flex-end">
          <Button
            variant="solid"
            size="md"
            textAlign="right"
            leftIcon={<CheckIcon />}
            colorScheme="green"
            mt={4}
          >
            Checkout
          </Button>
        </Flex>
      </Container>
    </Box>
  </>
)

export default Checkout
