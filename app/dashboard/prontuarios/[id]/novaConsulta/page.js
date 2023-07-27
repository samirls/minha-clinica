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
  keyframes,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ModalRegistrarConsulta from "@/app/components/Modals/ModalRegistrarConsulta";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import OnlineBall from "@/app/components/Other/OnlineBall";

function NovaConsulta({ params }) {
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
        <Box>
          <Text as='span' fontWeight="bold">Duração: </Text>
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

/* 'use client'

import { Avatar, Box, Flex, keyframes } from '@chakra-ui/react'

export default function AvatarWithRipple() {
  const size = '96px'
  const color = 'teal'

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="216px"
      w="full"
      overflow="hidden">
      <Box
        as="div"
        position="relative"
        w={size}
        h={size}
        _before={{
          content: "''",
          position: 'relative',
          display: 'block',
          width: '300%',
          height: '300%',
          boxSizing: 'border-box',
          marginLeft: '-100%',
          marginTop: '-100%',
          borderRadius: '50%',
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}>
        <Avatar src="https://i.pravatar.cc/300" size="full" position="absolute" top={0} />
      </Box>
    </Flex>
  )
} */
