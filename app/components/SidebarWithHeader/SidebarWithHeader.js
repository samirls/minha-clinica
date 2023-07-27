'use client'

import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import {RiGroupLine, RiUser3Line, RiTeamLine, RiUserAddLine, RiLogoutBoxLine} from 'react-icons/ri'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/navigation";

function logouFromLinkItems() {
  Cookies.remove('token');
}

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, navigate: "/dashboard" },
  { name: 'Novo Prontuário', icon: RiUserAddLine, navigate: "/dashboard/novoProntuario" },
  { name: 'Ultimos Prontuários', icon: RiTeamLine, navigate: "/dashboard/prontuarios" },
  { name: 'Buscar por Nome', icon: RiGroupLine, navigate: "/dashboard/buscarNome" },
  { name: 'Buscar por Id', icon: RiUser3Line },
  { name: 'Sair', icon: RiLogoutBoxLine, action: logouFromLinkItems, navigate: "/" },
];



/* function getUserInfoFromToken() {
    const jwtToken = Cookies.get('token');
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      return decodedToken;
    }
    return null;
  }

const infoFromToken = getUserInfoFromToken(); */




export default function Page({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg='white'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {

    const router = useRouter();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.300', 'gray.800')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Minha Clínica
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.navigate} action={link.action} >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};


const NavItem = ({ icon, href, children, action, ...rest }) => {

  const router = useRouter();

  function logout() {
    Cookies.remove('token');
    router.push("/");
  }

  return (
    <Link href={href} onClick={action}  style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="22"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
    

  const router = useRouter();

  function logout() {
    Cookies.remove('token');
    router.push("/");
  }


  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.300', 'gray.800')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Minha Clínica
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>

                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">User</Text>
                  <Text fontSize="xs" color="gray.600">
                    Role
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};