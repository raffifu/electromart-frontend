import Navbar from '../../components/Navbar'
import { getCartByUserId, editCart } from '../../redux/reducer/cartSlice'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import CartTable from '../../components/Cart/CartTable'
import { store } from '../../redux/store'

const CartList = ({ auth, cart, getCartByUserId }) => {
  const [togglerFetchData, setTogglerFetchData] = useState(false)
  useEffect(async () => {
    await getCartByUserId(auth.user.id)
  }, [togglerFetchData])
  return (
    <>
      <Navbar />
      <CartTable
        products={cart.listCarts}
        onUpdateQty={async (id, productId, quantity) => {
          await store.dispatch(
            editCart({
              id: id,
              product: productId,
              quantity: quantity,
              users_permissions_user: auth.user.id
            })
          )
          setTogglerFetchData(!togglerFetchData)
        }
        }
      />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  product: state.product,
  cart: state.cart
})

export default connect(mapStateToProps, {
  getCartByUserId
})(CartList)
