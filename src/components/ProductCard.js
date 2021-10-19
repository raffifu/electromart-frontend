import { Badge, Box, Image, VStack } from '@chakra-ui/react'

import NoImage from '../assets/images/no_image.png'
import { backendUrl } from '../constants/backend'

export default function ProductCard ({ actions, product }) {
  const thumbnailUrl = product.picture.length > 0 ? `${backendUrl}${product.picture[0].formats.thumbnail.url}` : NoImage

  return (
    <VStack align="stretch" spacing={4}>

      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" >
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

          {{ ...actions }}
        </Box>
      </Box>
    </VStack>
  )
}
