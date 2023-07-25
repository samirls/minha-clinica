"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ConsultasAnteriores({ params }) {
  const token = Cookies.get("token");
  const [consultasAnteriores, setConsultasAnteriores] = useState([]);

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

        setConsultasAnteriores(response.data.consultas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProntuarios();
  }, [token]);

  // Função para formatar a data no formato desejado (dd/mm/aaaa - hh:mm)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}H`;
  };

  return (
    <Box>
      <Flex justifyContent="center">
        <Heading as="h1" size="lg" noOfLines={1} pb={5}>
          Consultas Anteriores
        </Heading>
      </Flex>
      {consultasAnteriores.map((consulta, index) => (
        <Box key={index} pb={5} pt={5}>
          <Box
            boxShadow="xl"
            border="1px"
            borderColor="gray.400"
            borderRadius="10"
            p={2}
          >
            <Heading
              as="h2"
              size="md"
              noOfLines={1}
              borderBottom="1px"
              borderColor="gray.400"
            >
              {`${index + 1}ª Consulta, realizada em ${formatDate(consulta.dataConsulta)}:`}
            </Heading>

            <Text dangerouslySetInnerHTML={{ __html: consulta.descricao }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ConsultasAnteriores;
