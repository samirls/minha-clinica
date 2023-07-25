"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import styles from "./prontuarios.module.css";
import { AiFillEdit } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
import MiniTable from "@/app/components/Tables/MiniTable/MiniTable";

function Page() {
  const nomeDaPessoa = "FULANO DE TAL";
  const token = Cookies.get("token");
  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const [totalElements, setTotalElements] = useState("");

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
          Olá {nomeDaPessoa}. Você tem um total de {totalElements} prontuários cadastrados.
        </h4>
        <MiniTable prontuarios={prontuarios} />
        <div className={styles.totalPages}>
          <p>Página {currentPage + 1} de {totalPages}</p>
        </div>
        <div className={styles.buttons}>
          <Button onClick={handlePreviousPage} >
            <GrFormPrevious />
          </Button>
          <Input type="number"  width={165} placeholder="Digite uma página" onChange={handleGoToPage}/>
          <Button onClick={handleNextPage}>
            <GrFormNext />
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Page;

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
