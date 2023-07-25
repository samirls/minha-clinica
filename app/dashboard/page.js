"use client";

import React, { useEffect, useState } from "react";
import OnlineBall from "../components/Other/OnlineBall";
import { Box } from "@chakra-ui/react";
import axios from "axios";

function Page() {
  const [serverStatus, setServerStatus] = useState([]);

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
      <OnlineBall />
      <Box>{serverStatus.data}</Box>
    </Box>
  );
}

export default Page;
