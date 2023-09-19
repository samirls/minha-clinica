"use client";

import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useStyleConfig,
  TableContainer,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { FiEye } from "react-icons/fi";
import styles from "./MiniTable.module.css";
import Link from "next/link";

function MiniTable({ prontuarios }) {


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day}/${month}/${year} - ${hours}:${minutes}H`;
  }

  return (
    <div>
      <div>
        <Table boxShadow="lg" border="1px" borderColor="gray.100">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Data de Criação</Th>
              <Th>Consultas Realizadas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prontuarios?.map((prontuario) => (
              <Tr key={prontuario.id} className={styles.hoveredRow}>
                <Td className={styles.td}>
                  <Link href={`/dashboard/prontuarios/${prontuario.id}`}>
                    {prontuario.nome}
                    <div className={styles.tdDiv}>Id: {prontuario.id}</div>
                  </Link>
                </Td>
                <Td>
                  <Link href={`/dashboard/prontuarios/${prontuario.id}`}>
                    {formatDate(prontuario.dataDeRegistro)}
                  </Link>
                </Td>
                <Td>{prontuario.consultas.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default MiniTable;
