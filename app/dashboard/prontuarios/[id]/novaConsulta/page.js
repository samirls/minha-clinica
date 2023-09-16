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
  Text,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ModalRegistrarConsulta from "@/app/components/Modals/ModalRegistrarConsulta";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'animate.css';
import {useStore} from "@/app/stores/store";

function NovaConsulta() {
  const id = useStore((state) => state.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");
  const [prontuario, setProntuario] = useState("");
  const [consultaText, setConsultaText] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);


  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/prontuario/${id}`,
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
    setStartTime(Date.now());
    return () => {
      setElapsedTime(0);
    };
  }, [token]);

  useEffect(() => {
    // Update the elapsed time every second
    const timer = setInterval(() => {
      if (startTime) {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const handleRegistrarConsulta = async () => {
    try {
      await axios.post(
        `http://localhost:8080/prontuario/${id}/consulta`,
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
      router.push(`/dashboard/prontuarios/${id}`);
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
        <Text as="i" fontWeight={500} fontSize="2xl">
          {prontuario.nome}
        </Text>
        <SimpleGrid minChildWidth="300px" columns={4} spacing={1}>
          <Box>
            <Text as="span" fontWeight="bold">
              Id:
            </Text>{" "}
            {prontuario.id}
          </Box>
          <Box>
            <Text as="span" fontWeight="bold">
              Nascimento:{" "}
            </Text>
            {prontuario.dataDeNascimento}
          </Box>
          <Box>
            <Text as="span" fontWeight="bold">
              Tipo Sanguineo:{" "}
            </Text>
            {prontuario.tipoSanguineo}
          </Box>
          <Box>
            <Text as="span" fontWeight="bold">
              Alergias:{" "}
            </Text>
            {prontuario.alergias}
          </Box>
        </SimpleGrid>
        <Box className="animate__animated animate__flash">
          <Text  as='span' fontWeight="bold">Duração: </Text>
          {formatTime(elapsedTime)}
        </Box>
      </Flex>
      <ReactQuill 
        value={consultaText}
        onChange={setConsultaText}
        style={{ height: "350px" }}
      />
      <Flex justifyContent="center" pt={50}>
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

