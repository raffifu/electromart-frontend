import {
  Box,
  Heading,
  Divider,
  Select,
  Spinner,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import { useState, useEffect } from 'react'

// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow (lat1, lon1, lat2, lon2) {
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  lat1 = toRad(lat1)
  lat2 = toRad(lat2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

// Converts numeric degrees to radians
function toRad (Value) {
  return (Value * Math.PI) / 180
}

function Logistic ({ courier, products, sellers, address, courierCost, setCourierCost }) {
  const [selectedCourier, setSelectedCourier] = useState()

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  useEffect(() => {
    if (selectedCourier) {
      // TODO: Send Data to backend for calculate ongkir
      // Temporary: calculate only from frontend
      const courierData = courier.listCouriers.filter(
        c => c.id === parseInt(selectedCourier)
      )[0]
      sellers.map(seller => {
        if (typeof seller.address !== 'undefined') {
          const distance = calcCrow(
            seller.address.latitude,
            seller.address.longitude,
            address.latitude,
            address.longitude
          )
          let weight = 0
          products
            .filter(
              entity => entity.product.users_permissions_user === seller.id
            )
            .map(cart => (weight += cart.quantity * cart.product.weightInGrams))
          const entity = {
            id: seller.id,
            sellerName: seller.name,
            cost:
              courierData.cost +
              (distance * courierData.cost_per_km * weight) / 1000
          }
          setCourierCost([...courierCost, entity])
        }
        return 0
      })
    }
  }, [selectedCourier])

  return (
    <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
      <Heading size="md" as="h2" pt={2} pb={2}>
        Kurir
      </Heading>
      <Divider borderColor="blackAlpha.500" mt={2} mb={2} />
      {courier.listCouriers.length > 0
        ? (
        <Select
          icon={<ChevronDownIcon />}
          variant="outline"
          size="lg"
          onChange={e => {
            setCourierCost([])
            setSelectedCourier(e.target.value)
          }}
          value={selectedCourier}
          placeholder="Pilih Kurir"
        >
          {courier.listCouriers.map(courier => (
            <option key={courier.id} value={courier.id}>
              {courier.name} (mulai: {formatter.format(courier.cost)})
            </option>
          ))}
        </Select>
          )
        : (
        <Spinner my={2} size="md" label="Loading" />
          )}
      {selectedCourier && (
        <>
          {courierCost.map(cost => (
            <Table key={cost.id} size="sm" variant="simple" mt={4}>
              <Tbody>
                <Tr>
                  <Td colSpan="2" align="start">
                    {cost.sellerName}
                  </Td>
                  <Td align="end" isNumeric>
                    {formatter.format(cost.cost)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ))}
        </>
      )}
    </Box>
  )
}

export default Logistic
