'use client'

import React from "react";
import styles from './novoProntuario.module.css'
import CreateProntuario from "@/app/components/CreateProntuario/CreateProntuario";

function Page() {
  return (
    <div>
      <h2 className={styles.h2}>Novo Prontuário</h2>
      <CreateProntuario />
    </div>
  );
}

export default Page;
