import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Divider
} from '@chakra-ui/react'

function Address () {
  return (
        <Box
            backgroundColor="#ffffff"
            borderRadius={8}
            p={4}
            boxShadow="md"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              pt={2}
              pb={2}
            >
              <Heading size="md" as="h2">
                Alamat
              </Heading>
              <Button variant="solid" size="xs" colorScheme="linkedin" p={3}>
                Edit
              </Button>
            </Flex>

            <Divider borderColor="blackAlpha.500" />

            <Text p={3} fontStyle="italic" fontSize="sm">
              Bulaksumur, 55281, Karang Malang, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
            </Text>
        </Box>
  )
}

export default Address
