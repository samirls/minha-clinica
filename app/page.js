"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [tokenJWT, setTokenJWT] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/auth/login`, {
        login,
        password,
      });

      const getTokenFromBackend = response.data.token;
      Cookies.set("token", getTokenFromBackend, { expires: 1 });
      setTokenJWT(getTokenFromBackend);

      toast({
        title: "Login Realizado!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao tentar efetuar o Login. Por favor, tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgImage="url('https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"blue.50"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="login">
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                bg={"white"}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                bg={"white"}
                borderColor="gray.400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                isLoading={isLoading}
                loadingText="Conectando..."
                bg={"blue"}
                onClick={handleLogin}
                color={"white"}
                _hover={{
                  bg: "blue.600",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
