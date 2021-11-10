import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoMdSync } from 'react-icons/io'

import { Link as RouteLink } from 'react-router-dom'

import { ColorModeSwitcher } from '../ColorModeSwitcher'

import Search from './Search'
import { ROLES } from '../constants'

import { connect } from 'react-redux'

function NavigationBar ({ isAuthenticated, user }) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Button
            as={RouteLink}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={600}
            color={useColorModeValue('blue.400', 'white')}
            bg={'white.1000'}
            to={'/'}
            _hover={{
              bg: 'gray.100'
            }}
          >
            Electro Mart
          </Button>

          <DesktopNav />
        </Flex>
        {!isAuthenticated && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              as={RouteLink}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              to={'/login'}
            >
              Log In
            </Button>
            <Button
              as={RouteLink}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              to={'/register'}
              _hover={{
                bg: 'blue.300'
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
        {isAuthenticated && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {user.role.id === ROLES.CUSTOMER && (
              <>
                <IconButton
                  as={RouteLink}
                  to={'/carts'}
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<AiOutlineShoppingCart />}
                />
                <IconButton
                  as={RouteLink}
                  to={'/'}
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<IoMdSync />}
                />
              </>
            )}
            <Button
              as={RouteLink}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              to={'/profilePage'}
              _hover={{
                bg: 'blue.600'
              }}
            >
              Profile
            </Button>
          </Stack>
        )}
        <ColorModeSwitcher />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      <Search />
      {NAV_ITEMS.map(navItem => (
        <Center key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Center>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Computer',
    children: [
      {
        label: 'CPU',
        subLabel: 'RAM, Processor, Graphic Cards, Hard Drives',
        href: '#'
      },
      {
        label: 'Monitor',
        href: '#'
      },
      {
        label: 'Mouse & Keyboards',
        href: '#'
      }
    ]
  },
  {
    label: 'Laptop',
    children: [
      {
        label: 'Apple',
        href: '#'
      },
      {
        label: 'HP',
        href: '#'
      },
      {
        label: 'Dell',
        href: '#'
      },
      {
        label: 'Asus',
        href: '#'
      },
      {
        label: 'Lenovo',
        href: '#'
      },
      {
        label: 'Acer',
        href: '#'
      }
    ]
  },
  {
    label: 'Smartphone',
    children: [
      {
        label: 'Apple',
        href: '#'
      },
      {
        label: 'Samsung',
        href: '#'
      },
      {
        label: 'Xiaomi',
        href: '#'
      },
      {
        label: 'Huawei',
        href: '#'
      },
      {
        label: 'Oppo',
        href: '#'
      }
    ]
  }
]

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(NavigationBar)
