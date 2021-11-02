import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Input
} from '@chakra-ui/react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import { useState, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ProductForm ({ auth, onSubmit, product, submitButtonText }) {
  const history = useHistory()
  const [formData, setFormData] = useState({
    detail: '',
    latitude: -7.8022752,
    longitude: 110.3420861,
    primary: false,
    users_permissions_user: null
  })
  const center = {
    lat: -7.8022752,
    lng: 110.3420861
  }
  const [position, setPosition] = useState(center)

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const changePrimary = e => {
    setFormData({ ...formData, primary: JSON.parse(e) })
  }

  const submit = async () => {
    await onSubmit({
      ...formData,
      users_permissions_user: auth.user.id,
      latitude: position.lat,
      longitude: position.lng
    })
    history.goBack()
  }

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend () {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      }
    }),
    []
  )

  return (
    <Container marginTop="50px" marginBottom="50px">
      <Box rounded={'lg'} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <FormControl id="detail">
            <FormLabel>Detail</FormLabel>
            <Input
              onChange={onChange}
              type="text"
              name="detail"
              value={formData.detail}
              placeholder=""
            />
          </FormControl>
          <FormControl>
            <FormLabel>Choose location</FormLabel>
            <Center>
              <MapContainer
                style={{ height: '360px', width: '480px' }}
                center={[-7.8022752, 110.3420861]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  draggable={true}
                  eventHandlers={eventHandlers}
                  position={position}
                  ref={markerRef}
                />
              </MapContainer>
            </Center>
          </FormControl>
          <RadioGroup
            onChange={changePrimary}
            value={formData.primary}
            name="primary"
          >
            <Stack direction="row">
              <Radio value={true}>Primary</Radio>
              <Radio value={false}>Secondary</Radio>
            </Stack>
          </RadioGroup>
          <Stack spacing={2}>
            <Button
              onClick={submit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              {submitButtonText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps)(ProductForm)
