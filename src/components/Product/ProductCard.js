import { Badge, Box, Flex, Image } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { sendTracker } from '../../utils'

import NoImage from '../../assets/images/no_image.png'
import { backendUrl, ROLES } from '../../constants'

function ProductCard ({ actions, product, auth }) {
  const history = useHistory()

  const getPictureUrl = (pic) => {
    if (pic.formats.small) return backendUrl + pic.formats.small.url
    if (pic.formats.thumbnail) return backendUrl + pic.formats.thumbnail.url
    return NoImage
  }
  const thumbnailUrl = product.picture.length > 0 ? getPictureUrl(product.picture[0]) : NoImage

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
        if (auth.isAuthenticated && auth.user.role.id === ROLES.CUSTOMER) {
          sendTracker({
            productId: product.id,
            userId: auth.user.id
          }, 'click_product')
        }

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
          objectFit="cover"
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProductCard)
