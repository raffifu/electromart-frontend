import {
  Box,
  Heading,
  Divider,
  Select,
  Text,
  Flex,
  Spinner
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import { useState, useEffect } from 'react'

function Logistic ({ courier, weight }) {
  const [selectedCourier, setSelectedCourier] = useState()

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  useEffect(() => {
    if (selectedCourier) {
      // TODO: Send Data to backend for calculate ongkir
      console.log(selectedCourier)
      console.log(weight)
    }
  }, [selectedCourier])

  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
           <Heading size="md" as="h2" pt={2} pb={2}>
             Kurir
           </Heading>
           <Divider borderColor="blackAlpha.500" mt={2} mb={2} />
           {courier.listCouriers.length > 0
             ? <Select icon={<ChevronDownIcon />} variant="outline" size="lg" onChange={e => setSelectedCourier(e.target.value)} value={selectedCourier} placeholder="Pilih Kurir">
              {courier.listCouriers.map(courier => <option key={courier.id} value={courier.id}>{courier.name} (mulai: {formatter.format(courier.cost)})</option>)}
            </Select>
             : <Spinner my={2} size="md" label="Loading" />
            }

            {selectedCourier && (
              <Flex mt={2} pl={2} alignItems="center">
                <Text fontStyle="italic" fontSize="sm">
                  Ongkos Kirim:
                </Text>
                {courier.cost
                  ? <Text ml={1} fontSize="sm" fontWeight="bold" fontStyle="italic">{formatter.format(courier.cost)}</Text>
                  : <Spinner ml={1} size="sm" />
                }
            </Flex>
            )}

        </Box>
  )
}

export default Logistic
