"use client";

import ProntuarioTable from '@/app/components/Tables/ProntuarioTable/ProntuarioTable';
import styles from './UserPage.module.css'
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useStore} from '@/app/stores/store';

function UserPage({ params }) {

  const setId = useStore((state) => state.setId);
  
  useEffect(() => {
    setId(params.id);
  }, [params.id]);

  const token = Cookies.get("token");
  const [prontuario, setProntuario] = useState('');
  const [hasDataChanged, setHasDataChanged] = useState(0);

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
  }, [token, hasDataChanged]);

  const handleDataChange = () => {
    setHasDataChanged(hasDataChanged + 1);
  } 


  return (
    <div>
      <h2 className={styles.h2}>Detalhes do Prontuário</h2>
      <ProntuarioTable prontuario={prontuario} dinamicRefresh={handleDataChange} />
    </div>
  );
}

export default UserPage;
