import {
  Box,
  Heading,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Text
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'

const RadioItem = ({ value }) => (
  <Radio value={value}>
    <Flex flexDirection="column">
      <Heading size="sm" as="h3">
        Bank BCA
      </Heading>
      <Text fontStyle="italic" fontSize="xs">
        Verifikasi Manual
      </Text>
    </Flex>
  </Radio>
)

function Payment () {
  const [method, setMethod] = useState('1')

  useEffect(() => {
    console.log('method', method)
  }, [method])

  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
            <Heading size="md" as="h2" pt={2} pb={2}>
                Metode Pembayaran
            </Heading>
            <Divider borderColor="blackAlpha.500" />
              <Accordion allowMultiple>
                <RadioGroup onChange={setMethod} value={method}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Transfer Manual
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Stack spacing={2}>
                          <RadioItem value="1" />
                          <RadioItem value="2" />
                        </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </RadioGroup>
              </Accordion>
        </Box>
  )
}

export default Payment
