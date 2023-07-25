import React from "react";
import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperFlex,
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
  Center,
  Spacer,
} from "@chakra-ui/react";
import { TbReportOff } from "react-icons/tb";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Link from "next/link";

function ProntuarioTable({ prontuario, id }) {
  return (
    <Box boxShadow="2xl" border="1px" borderColor="gray.200" borderRadius="20">
      <Flex justifyContent="center" fontSize={25} fontWeight={500} pt={5}>
        <Box>{prontuario.nome}</Box>
      </Flex>
      <Flex justifyContent="center" fontSize={18} fontWeight={500}>
        Id: {id}
      </Flex>
      <hr />
      <SimpleGrid p={2} gap={6} minChildWidth="320px">
        <Flex>
          <Box fontWeight={600}> Consultas: </Box>
          <Box w="4px" />
          {prontuario.consultas ? prontuario.consultas.length : 0}
        </Flex>
      </SimpleGrid>
      <hr />
      <SimpleGrid p={2} gap={6} minChildWidth="320px">
        <Flex>
          <Box fontWeight={600}> Telefone: </Box>
          <Box w="4px" />
          {prontuario.telefone}
        </Flex>
        <Flex>
          <Box fontWeight={600}> E-mail: </Box>
          <Box w="4px" />
          {prontuario.email}
        </Flex>
      </SimpleGrid>
      <hr />
      <SimpleGrid p={2} gap={6} minChildWidth="320px">
        <Flex>
          <Box fontWeight={600}> Sexo: </Box>
          <Box w="4px" />
          {prontuario.sexo}
        </Flex>
        <Flex>
          <Box fontWeight={600}> Data de Nascimento: </Box>
          <Box w="4px" />
          {prontuario.dataDeNascimento}
        </Flex>
        <Flex>
          <Box fontWeight={600}> CPF: </Box>
          <Box w="4px" />
          {prontuario.cpf}
        </Flex>
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Identidade: </Box>
          <Box w="4px" />
          {prontuario.identidade}
          <TbReportOff />
        </Flex>
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Tipo Sanguineo: </Box>
          <Box w="4px" />
          {prontuario.tipoSanguineo}
        </Flex>
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Alergias: </Box>
          <Box w="4px" />
          {prontuario.alergias}
        </Flex>
      </SimpleGrid>
      <hr />
      <SimpleGrid p={2} gap={6} minChildWidth="320px">
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Endereço: </Box>
          <Box w="4px" />
          {prontuario.endereço}
        </Flex>
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Cidade: </Box>
          <Box w="4px" />
          {prontuario.cidade}
        </Flex>
        <Flex w="100%" align="center">
          <Box fontWeight={600}> Estado: </Box>
          <Box w="4px" />
          {prontuario.estado}
        </Flex>
      </SimpleGrid>
      <hr />
      <SimpleGrid columns={4} w="100%" p={5} gap={5} minChildWidth="240px" justifyItems="center">
        <Box>
          <Button leftIcon={<MdOutlineEditLocationAlt />} colorScheme="yellow">
            Editar Prontuário
          </Button>
        </Box>
        <Button leftIcon={<RiDeleteBin7Line />} colorScheme="red">
          Deletar Prontuário e Consultas
        </Button>
        <Box>
        <Button
          justify-content="flex-end"
          leftIcon={<TfiWrite />}
          colorScheme="green"
        >
          <Link href={`/dashboard/prontuarios/${id}/ConsultasAnteriores`}>
            Consultas Anteriores
          </Link>
        </Button>
        </Box>
        <Box>
        <Button
          justify-content="flex-end"
          leftIcon={<TfiWrite />}
          colorScheme="whatsapp"
        >
          <Link href={`/dashboard/prontuarios/${id}/novaConsulta`}>
            Nova Consulta
          </Link>
        </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default ProntuarioTable;
