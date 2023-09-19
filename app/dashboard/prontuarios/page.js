"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import styles from "./prontuarios.module.css";
import { AiFillEdit } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
import MiniTable from "@/app/components/Tables/MiniTable/MiniTable";
import { useStore } from "@/app/stores/store";
import { color } from "framer-motion";

function Page() {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const infoFromToken = useStore((store) => store.infoFromToken);
  const setProntuarios = useStore((store) => store.setProntuarios);
  const prontuarios = useStore((store) => store.prontuarios);
  const setTotalPages = useStore((store) => store.setTotalPages);
  const totalPages = useStore((store) => store.totalPages);
  const setTotalElements = useStore ((store) => store.setTotalElements);
  const totalElements = useStore ((store) => store.totalElements);

  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/prontuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
          },
        });
        const { content, totalPages, totalElements } = response.data;
        setProntuarios(content);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProntuarios();
  }, [token, currentPage]);

  console.log(totalPages)


  //Atualizar a página atual
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };

  //Avançar para a próxima página
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      updateCurrentPage(currentPage + 1);
    }
  };

  //Voltar para a página anterior
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      updateCurrentPage(currentPage - 1);
    }
  };

  //Navegar para uma página específica
  const handleGoToPage = (event) => {
    const pageNumber = parseInt(event.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      updateCurrentPage(pageNumber - 1);
    }
  };

  return (
    <div>
      <div>
        <h2 className={styles.h2}>Últimos Prontuários</h2>
        <h4 className={styles.h4}>
          Olá
          <span
            style={{ color: "blue", paddingLeft: "5px", fontWeight: "bold" }}
          >
            {infoFromToken?.sub?.toUpperCase()}
          </span>
          . Você tem um total de
          <span
            style={{
              color: "blue",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "bold",
            }}
          >
            {totalElements}
          </span>
          prontuários cadastrados.
        </h4>
        <MiniTable prontuarios={prontuarios} />
        <div className={styles.totalPages}>
          <p>
            Página {currentPage + 1} de {totalPages}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button onClick={handlePreviousPage}>
            <GrFormPrevious />
          </Button>
          <Input
            type="number"
            width={165}
            placeholder="Digite uma página"
            onChange={handleGoToPage}
          />
          <Button onClick={handleNextPage}>
            <GrFormNext />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
