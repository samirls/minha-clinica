"use client";

import React, { useState } from "react";
import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Select,
  FormLabel,
  useToast,
  Grid,
  Flex,
  SimpleGrid,
  Input,
  extendTheme,
  Box,
  Button,
} from "@chakra-ui/react";
import styles from "./CreateProntuario.module.css";
import ModalLimparFormulario from "../Modals/ModalLimparFormulario";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";

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

function CreateProntuario() {
  const toast = useToast();

  const token = Cookies.get("token");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    sexo: "",
    dataDeNascimento: "",
    cpf: "",
    identidade: "",
    cidade: "",
    estado: "",
    endereço: "",
    alergias: "",
    tipoSanguineo: "",
  });

  const handleFormClear = () => {
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      sexo: "",
      dataDeNascimento: "",
      cpf: "",
      identidade: "",
      cidade: "",
      estado: "",
      endereço: "",
      alergias: "",
      tipoSanguineo: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const prontuarioData = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      sexo: formData.sexo,
      dataDeNascimento: formData.dataDeNascimento,
      cpf: formData.cpf,
      identidade: formData.identidade,
      cidade: formData.cidade,
      estado: formData.estado,
      endereço: formData.endereço,
      alergias: formData.alergias,
      tipoSanguineo: formData.tipoSanguineo,
    };

    axios
      .post("http://localhost:8080/prontuario", prontuarioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleFormClear();
        toast({
          title: "Prontuário enviado!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description:
            "Ocorreu um erro ao tentar enviar o formulário. Por favor, tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Box boxShadow='lg' border='1px' borderColor="gray.200" borderRadius='20'>
        <div className={styles.header}>Preencha os Dados do Paciente:</div>
        <ChakraProvider theme={theme}>
          <SimpleGrid p={2} gap={6} minChildWidth="320px">
            <FormControl variant="floating" id="first-name">
              <Input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
                type="text"
              />
              <FormLabel>Nome Completo*</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="first-name">
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
                type="number"
              />
              <FormLabel>Telefone*</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="first-name">
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
                type="email"
              />
              <FormLabel>E-mail*</FormLabel>
            </FormControl>

            <Select
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
              placeholder="Sexo"
              bg={'white'}
              borderColor="gray.400"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </Select>
            <FormControl variant="floating" id="first-name">
              <Input
                name="dataDeNascimento"
                value={formData.dataDeNascimento}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
                type="date"
              />
              <FormLabel>Data de Nascimento</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="first-name">
              <Input
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
                type="number"
              />
              <FormLabel>CPF*</FormLabel>
            </FormControl>

            <FormControl variant="floating" id="first-name">
              <Input
                name="identidade"
                value={formData.identidade}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
              />
              <FormLabel>Identidade</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="first-name">
              <Input
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
              />
              <FormLabel>Cidade</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="first-name">
              <Input
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
              />
              <FormLabel>Estado</FormLabel>
            </FormControl>

            <FormControl variant="floating" id="first-name">
              <Input
                name="endereço"
                value={formData.endereço}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
              />
              <FormLabel>Endereço</FormLabel>
            </FormControl>

            <FormControl variant="floating" id="first-name">
              <Input
                name="alergias"
                value={formData.alergias}
                onChange={handleInputChange}
                placeholder=" "
                borderColor="gray.400"
                bg={'white'}
              />
              <FormLabel>Alergias</FormLabel>
            </FormControl>
            <Select
              name="tipoSanguineo"
              value={formData.tipoSanguineo}
              onChange={handleInputChange}
              placeholder="Tipo Sanguineo"
              borderColor="gray.400"
              bg={'white'}
              className={styles.select}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </SimpleGrid>
        </ChakraProvider>
        <Flex py="30px" gap={15} justifyContent="center">
          <Button colorScheme="red" onClick={onOpen}>
            Limpar Formulário
          </Button>
          <Button colorScheme="whatsapp" onClick={handleFormSubmit}>
            Enviar
          </Button>
          <ModalLimparFormulario
            isOpen={isOpen}
            onClose={onClose}
            onClearForm={handleFormClear}
          />
        </Flex>
      </Box>
    </div>
  );
}

export default CreateProntuario;

/* key={item.id}
id={item.id}
nome={item.nome}
email={item.email}
sexo={item.sexo}
telefone={item.telefone}
dataDeNascimento={item.dataDeNascimento}
cpf={item.cpf}
identidade={item.identidade}
endereço={item.endereço}
cidade={item.cidade}
estado={item.estado}
tipoSanguineo={item.tipoSanguineo}
alergias={item.alergias}
consulta={item.consulta}
dataDeRegistro={item.dataDeRegistro} 
consultasRealizadas={item.consultas.length}
*/
