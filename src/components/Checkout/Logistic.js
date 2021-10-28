import {
  Box,
  Heading,
  Divider
} from '@chakra-ui/react'

function Logistic () {
  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
           <Heading size="md" as="h2" pt={2} pb={2}>
             Kurir
           </Heading>
           <Divider borderColor="blackAlpha.500" />
        </Box>
  )
}

export default Logistic
