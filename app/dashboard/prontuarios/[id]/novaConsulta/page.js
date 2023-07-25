"use client";

import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  useDisclosure,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ModalRegistrarConsulta from "@/app/components/Modals/ModalRegistrarConsulta";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NovaConsulta({ params }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");
  const [prontuario, setProntuario] = useState("");
  const [consultaText, setConsultaText] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/prontuario/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProntuario(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProntuarios();
  }, [token]);

  const handleRegistrarConsulta = async () => {
    try {
      await axios.post(
        `http://localhost:8080/prontuario/${params.id}/consulta`,
        {
          descricao: consultaText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConsultaText("");
      toast({
        title: "Consulta Registrada!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/dashboard/prontuarios/${params.id}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Flex justifyContent="center">
        <Heading as="h1" size="lg" noOfLines={1}>
          Consulta
        </Heading>
      </Flex>
      <Flex minWidth="max-content" flexDir="column" pt={5} pb={3}>
        <Heading as="h2" size="md" noOfLines={1}>
          {prontuario.nome}
        </Heading>
        <SimpleGrid columns={4} spacing={5}>
          <Box>Id: {prontuario.id}</Box>
          <Box>Nascimento: {prontuario.dataDeNascimento}</Box>
          <Box>Tipo Sanguineo: {prontuario.tipoSanguineo}</Box>
          <Box>Alergias: {prontuario.alergias}</Box>
        </SimpleGrid>
      </Flex>
      <ReactQuill
        value={consultaText}
        onChange={setConsultaText}
        style={{ height: "50vh" }}
      />
      <Flex justifyContent="center" pt={5}>
        <Button rightIcon={<BsSend />} colorScheme="whatsapp" onClick={onOpen}>
          Registrar Consulta
        </Button>
      </Flex>
      <ModalRegistrarConsulta
        isOpen={isOpen}
        onClose={onClose}
        onRegistrarConsulta={handleRegistrarConsulta}
      />
    </div>
  );
}

export default NovaConsulta;
