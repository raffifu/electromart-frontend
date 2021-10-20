import { Badge, Box, Flex, Image } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import NoImage from '../../assets/images/no_image.png'
import { backendUrl } from '../../constants'

export default function ProductCard ({ actions, product }) {
  const history = useHistory()
  const thumbnailUrl = product.picture.length > 0 ? `${backendUrl}${product.picture[0].formats.thumbnail.url}` : NoImage

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      minH="400px"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      onClick={() => {
        history.push('/product/' + product.id)
      }}
      style={{ cursor: 'pointer' }}
    >
      <Flex direction="column">
        <Image
          height="100px"
          width="100px"
          minWidth="100%"
          minHeight="240px"
          maxHeight="240px"
          overflow="hidden"
          src={thumbnailUrl}
          alt={product.name} />
        <Box>
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
          </Box>
          {{ ...actions }}
        </Box>
      </Flex>
    </Box>
  )
}
