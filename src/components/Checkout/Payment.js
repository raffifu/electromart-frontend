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

import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPaymentMethods } from '../../redux/reducer/paymentMethodSlice'

const RadioItem = ({ method, value, verification }) => (
  <Radio value={value}>
    <Flex flexDirection="column">
      <Heading size="sm" as="h3">
        {method}
      </Heading>
      <Text fontStyle="italic" fontSize="xs">
        {verification}
      </Text>
    </Flex>
  </Radio>
)

function Payment ({ paymentMethods, getPaymentMethods, paymentMethod: method, setPaymentMethod: setMethod }) {
  useEffect(async () => {
    await getPaymentMethods()
  }, [])

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
                  {method && paymentMethods.filter(p => parseInt(p.id) === parseInt(method))[0]
                    ? paymentMethods.filter(p => parseInt(p.id) === parseInt(method))[0].method
                    : 'Silahkan pilih metode pembayaran'}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={2}>
                {paymentMethods.map(p => (
                  <RadioItem
                    key={p.id}
                    value={`${p.id}`}
                    verification={p.verification}
                    method={p.method}
                  />
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </RadioGroup>
      </Accordion>
    </Box>
  )
}

const mapStateToProps = state => ({
  paymentMethods: state.paymentMethod.listPaymentMethods
})

export default connect(mapStateToProps, { getPaymentMethods })(Payment)
