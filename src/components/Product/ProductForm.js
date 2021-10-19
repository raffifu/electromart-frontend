import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Icon,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { AiFillFileAdd } from 'react-icons/ai'
// import { useHistory } from 'react-router-dom'

import { useCallback, useState } from 'react'
import { connect } from 'react-redux'

function ProductForm ({ auth, onSubmit, product }) {
  // const history = useHistory()
  const [formData, setFormData] = useState({
    name: product.currentProduct.name,
    price: product.currentProduct.price,
    weightInGrams: product.currentProduct.weightInGrams,
    condition: product.currentProduct.condition,
    users_permissions_user: auth.user.id,
    stock: product.currentProduct.stock,
    description: product.currentProduct.description
  })
  // const [selectedFiles, setSelectedFiles] = useState([])

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const changeCondition = (e) => {
    setFormData({ ...formData, condition: e })
  }

  const changePrice = (e) => {
    setFormData({ ...formData, price: parseInt(e) })
  }

  const changeWeightInGrams = (e) => {
    setFormData({ ...formData, weightInGrams: parseInt(e) })
  }

  const changeStock = (e) => {
    setFormData({ ...formData, stock: parseInt(e) })
  }

  const submit = () => {
    console.log('submitting')
    onSubmit(formData)
  }

  const onDrop = useCallback(acceptedFiles => {
    // setSelectedFiles(acceptedFiles)
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 3,
    multiple: false
  })

  const dropText = isDragActive
    ? 'Drop the files here'
    : 'Drag and drop image file here, or click to select files'

  const activeBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500'
  )

  return (
    <Container marginTop="50px" marginBottom="50px">
      <Box rounded={'lg'} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Product Name</FormLabel>
            <Input
              onChange={onChange}
              type="text"
              name="name"
              value={formData.name}
              placeholder=""
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <NumberInput
              onChange={changePrice}
              value={formData.price}
              min={0}
              max={99999999}
              >
              <NumberInputField />
              <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="weight_in_grams">
            <FormLabel>Weight (in grams)</FormLabel>
            <NumberInput
              onChange={changeWeightInGrams}
              value={formData.weightInGrams}
              min={0}
              max={99999999}
              >
              <NumberInputField />
              <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <RadioGroup
            onChange={changeCondition}
            value={formData.condition}
            name="condition"
          >
            <Stack direction="row">
              <Radio value="new">New</Radio>
              <Radio value="second">Second</Radio>
            </Stack>
          </RadioGroup>
          <FormControl id="stock">
            <FormLabel>Stock</FormLabel>
            <NumberInput
              onChange={changeStock}
              value={formData.stock}
              min={0}
              max={100000}
              >
              <NumberInputField />
              <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={onChange}
              name="description"
              value={formData.description}
              placeholder=""
            />
          </FormControl>
          <FormControl>
            <Center
              p={10}
              cursor="pointer"
              bg={isDragActive ? activeBg : 'transparent'}
              _hover={{ bg: activeBg }}
              transition="background-color 0.2s ease"
              borderRadius={4}
              border="3px dashed"
              borderColor={borderColor}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon as={AiFillFileAdd} mr={2} />
              <p>{dropText}</p>
            </Center>
          </FormControl>
          <Stack spacing={2}>
            <Button
              onClick={submit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps)(ProductForm)
