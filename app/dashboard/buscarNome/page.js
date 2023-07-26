"use client";

import React, { useEffect, useState } from "react";
import styles from "./buscarNome.module.css";
import {
  Input,
  Box,
  InputGroup,
  extendTheme,
  ChakraProvider,
  FormControl,
  useToast,
  InputLeftElement,
  FormLabel,
  InputRightElement,
  Flex,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BiSearchAlt2 } from "react-icons/bi";
import MiniTable from "@/app/components/Tables/MiniTable/MiniTable";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";


const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
                backgroundColor: "white",
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

function Page() {

  const nomeDaPessoa = "FULANO DE TAL";
  const token = Cookies.get("token");
  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomePesquisado, setNomePesquisado] = useState("");
  const [nomeInvalido, setNomeInvalido] = useState("");

  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/prontuario/nome/${nomePesquisado}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProntuarios(response.data);
      } catch (error) {
        setNomeInvalido(nomePesquisado);
        console.error(error);
      }
    };

    if (nomePesquisado.trim() !== "") {
      fetchProntuarios();
    }
  }, [token, nomePesquisado]);

  return (
    <div>
      <div>
        <h2 className={styles.h2}>Buscar Prontuário por Nome</h2>
        <Flex pb={5} alignItems="center" justifyContent="center">
          <Box maxW="300px">
            <ChakraProvider theme={theme}>
              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <BiSearchAlt2 color="gray.300" />
                </InputRightElement>
                <FormControl variant="floating" id="first-name">
                  <Input
                    type="text"
                    placeholder=" "
                    borderColor="gray.400"
                    value={nomePesquisado}
                    onChange={(e) => setNomePesquisado(e.target.value)}
                  />
                  <FormLabel>Escreva um nome</FormLabel>
                </FormControl>
              </InputGroup>
            </ChakraProvider>
          </Box>
        </Flex>
        {nomePesquisado === "" ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            pt={150}
          >
            <Text color="gray.500" fontSize="2xl" fontWeight="400" mb={2}>
              Digite algo para pesquisar
            </Text>
            <Icon as={BsSearch} boxSize={10} color="gray.500" />
          </Flex>
        ) : nomePesquisado === nomeInvalido ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            pt={150}
          >
            <Text color="red" fontSize="3xl" fontWeight="600" mb={2}>
              Nome não encontrado
            </Text>
            <Icon as={MdNotInterested} boxSize={12} color="red" />
          </Flex>
        ) : (
          <MiniTable prontuarios={prontuarios} />
        )}
      </div>
    </div>
  );
}

export default Page;
