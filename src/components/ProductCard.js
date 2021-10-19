import { useHistory } from 'react-router-dom'

import { Badge, Box, Image } from '@chakra-ui/react'

import NoImage from '../assets/images/no_image.png'

export default function ProductCard (product) {
  const history = useHistory()
  const thumbnailUrl = product.picture.length > 0 ? product.picture[0].thumbnail.url : NoImage

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => history.push(`/products/${product.id}`)}>
      <Image src={thumbnailUrl} alt={product.name} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme={product.condition === 'new' ? 'teal' : 'pink'}>
            {product.condition === 'new' ? 'New' : 'Second'}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Weight {product.weightInGrams} grams &bull; Available {product.stock} pcs
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {product.name}
        </Box>

        <Box>
          Rp {product.price}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            Product by {product.users_permissions_user.firstName} {product.users_permissions_user.lastName}
          </Box>
        </Box>
        <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8}>
            Detail
        </Box>
      </Box>
    </Box>
  )
}
