"use client";

import ProntuarioTable from '@/app/components/Tables/ProntuarioTable/ProntuarioTable';
import styles from './UserPage.module.css'
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserPage({ params }) {

  const token = Cookies.get("token");
  const [prontuario, setProntuario] = useState('');

  useEffect(() => {
    const fetchProntuarios = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/prontuario/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProntuario(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProntuarios();
  }, [token]);


  return (
    <div>
      <h2 className={styles.h2}>Detalhes do Prontuário</h2>
      <ProntuarioTable prontuario={prontuario} id={params.id} />
    </div>
  );
}

export default UserPage;
