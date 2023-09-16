"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "../stores/store";
import jwt_decode from "jwt-decode";

function Page() {
  const [serverStatus, setServerStatus] = useState([]);
  const router = useRouter();
  const prontuariosState = useStore((store) => store.prontuariosState);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080");
      setServerStatus(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Box>Resposta do servidor: {serverStatus.data}</Box>
    </Box>
  );
}

export default Page;
