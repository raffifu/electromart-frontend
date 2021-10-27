import { useState, useEffect, useRef } from 'react'

import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'

import { getProducts } from '../redux/reducer/productSlice'
import { connect } from 'react-redux'

function Search ({ getProducts }) {
  const [name, setName] = useState('')
  const [timer, setTimer] = useState('')

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    clearTimeout(timer)
    setTimer(setTimeout(() => {
      getProducts(name !== '' ? { name_contains: name } : {})
    }, 1000))
  }, [name])

  return (
        <InputGroup>
            <InputLeftElement
            pointerEvents="none"
            >&#x1F50D;</InputLeftElement>
            <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Search" />
        </InputGroup>
  )
}

export default connect(null, { getProducts })(Search)
