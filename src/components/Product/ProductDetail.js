import {
  Box,
  Center,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Image
} from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

import NoImage from '../../assets/images/no_image.png'
import { backendUrl } from '../../constants'

function ProductDetail ({ product, actions }) {
  const [displayImageIndex, setDisplayImageIndex] = useState(0)
  const [images, setImages] = useState([
    { image: NoImage, alt: 'No picture', width: 500, height: 362 }
  ])

  useEffect(() => {
    if (product && product.picture.length > 0) {
      setImages(
        product.picture.map(pic => ({
          image: `${backendUrl}${pic.formats.medium.url}`,
          alt: pic.name,
          width: pic.formats.medium.width,
          height: pic.formats.medium.height
        }))
      )
    }
  }, [product])

  return (
    <Container marginTop="50px" marginBottom="50px">
      <Box>
        <Center>
          <Image
            height={images[displayImageIndex].height}
            width={images[displayImageIndex].width}
            overflow="hidden"
            src={images[displayImageIndex].image}
            alt={images[displayImageIndex].name}
          />
        </Center>
        <Box display="flex" justifyContent="space-between">
          <IconButton
            aria-label="icon"
            disabled={images.length <= 1}
            icon={<ChevronLeftIcon />}
            onClick={() =>
              setDisplayImageIndex(
                (((displayImageIndex - 1) % images.length) + images.length) %
                  images.length
              )
            }
            size="md"
          />
          <IconButton
            aria-label="icon"
            icon={<ChevronRightIcon />}
            disabled={images.length <= 1}
            onClick={() =>
              setDisplayImageIndex(
                (((displayImageIndex + 1) % images.length) + images.length) %
                  images.length
              )
            }
            size="md"
          />
        </Box>
        {product && (<Box>
          <FormControl id="name">
            <FormLabel>
              {' '}
              <b>Product Name</b> : {product.name}
            </FormLabel>
          </FormControl>
          <FormControl id="price">
            <FormLabel>
              {' '}
              <b>Price</b> : Rp {product.price}
            </FormLabel>
          </FormControl>
          <FormControl id="weightInGrams">
            <FormLabel>
              {' '}
              <b>Weight</b> : {product.weightInGrams} gr
            </FormLabel>
          </FormControl>
          <FormControl id="users_permissions_user">
            <FormLabel>
              {' '}
              <b>Seller</b> :{' '}
              {product.users_permissions_user.firstName}{' '}
              {product.users_permissions_user.lastName}
            </FormLabel>
          </FormControl>
          <FormControl id="stock">
            <FormLabel>
              {' '}
              <b>Description</b> : {product.stock}
            </FormLabel>
          </FormControl>
          <FormControl id="description">
            <FormLabel>
              {' '}
              <b>Description</b> : {product.description}
            </FormLabel>
          </FormControl>
        </Box>)}
        {{ ...actions }}
      </Box>
    </Container>
  )
}

export default ProductDetail
