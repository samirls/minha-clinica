"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Box,
  SimpleGrid,
  Flex,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import ModalConfirmarEdicao from "./ModalConfirmarEdicao";
import axios from "axios";
import Cookies from "js-cookie";
import useStore from "@/app/stores/store";

function ModalEditarProntuario({
  isOpen,
  onClose,
  dinamicRefresh,
  prontuario,
}) {
  const id = useStore((state) => state.id);
  const toast = useToast();
  const token = Cookies.get("token");

  const {
    isOpen: isNestedModalOpen,
    onOpen: handleOpenNestedModal,
    onClose: handleCloseNestedModal,
  } = useDisclosure();

  const initialFormData = {
    nome: prontuario.nome,
    email: prontuario.email,
    sexo: prontuario.sexo,
    telefone: prontuario.telefone,
    dataDeNascimento: prontuario.dataDeNascimento,
    cpf: prontuario.cpf,
    identidade: prontuario.identidade,
    endereço: prontuario.endereço,
    cidade: prontuario.cidade,
    estado: prontuario.estado,
    tipoSanguineo: prontuario.tipoSanguineo,
    alergias: prontuario.alergias,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [prontuario]);

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleSaveEdicao = () => {
    // Compare the current formData with the initialFormData
    const formDataKeys = Object.keys(formData);
    const initialFormDataKeys = Object.keys(initialFormData);

    const isDataChanged = formDataKeys.some(
      (key) => formData[key] !== initialFormData[key]
    );

    if (isDataChanged) {
      // Open the nested modal for confirmation
      handleOpenNestedModal();
    } else {
      // Display a message if no changes were made
      toast({
        title: "Nenhuma Alteração Realizada",
        description: "Edite o formulário para fazer alterações no Prontuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:8080/prontuario/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "Editar Prontuário:",
          description: "Prontuário editado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Erro ao atualizar prontuário",
          description: "Tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "5xl" }}
        isCentered
        onOverlayClick={handleCancel}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize={25}>
            Editar Prontuário
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              boxShadow="xl"
              border="1px"
              borderColor="gray.500"
              borderRadius="20"
            >
              <Flex justifyContent="center" alignItems="center" pt={5}>
                <Input
                  size="lg"
                  fontSize={28}
                  fontWeight={500}
                  color="yellow.700"
                  borderColor="gray.400"
                  maxW={{ base: "90%", md: "60%" }}
                  value={formData.nome}
                  onChange={(e) => handleFormChange("nome", e.target.value)}
                />
              </Flex>

              <hr />
              <SimpleGrid p={2} gap={6} minChildWidth="320px">
                <Flex alignItems="center">
                  <Box fontWeight={600}> Telefone: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.telefone}
                    onChange={(e) =>
                      handleFormChange("telefone", e.target.value)
                    }
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> E-mail: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </Flex>
              </SimpleGrid>
              <hr />
              <SimpleGrid p={2} gap={6} minChildWidth="320px">
                <Flex alignItems="center">
                  <Box fontWeight={600}> Sexo: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "30%", md: "20%" }}
                    value={formData.sexo}
                    onChange={(e) => handleFormChange("sexo", e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Data de Nascimento: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "30%", md: "30%" }}
                    value={formData.dataDeNascimento}
                    onChange={(e) =>
                      handleFormChange("dataDeNascimento", e.target.value)
                    }
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> CPF: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "40%", md: "30%" }}
                    value={formData.cpf}
                    onChange={(e) => handleFormChange("cpf", e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Identidade: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "30%", md: "30%" }}
                    value={formData.identidade}
                    onChange={(e) =>
                      handleFormChange("identidade", e.target.value)
                    }
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Tipo Sanguíneo: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "15%", md: "10%" }}
                    value={formData.tipoSanguineo}
                    onChange={(e) =>
                      handleFormChange("tipoSanguineo", e.target.value)
                    }
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Alergias: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.alergias}
                    onChange={(e) =>
                      handleFormChange("alergias", e.target.value)
                    }
                  />
                </Flex>
              </SimpleGrid>
              <hr />
              <SimpleGrid p={2} gap={6} minChildWidth="320px">
                <Flex alignItems="center">
                  <Box fontWeight={600}> Endereço: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.endereço}
                    onChange={(e) =>
                      handleFormChange("endereço", e.target.value)
                    }
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Cidade: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.cidade}
                    onChange={(e) => handleFormChange("cidade", e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center">
                  <Box fontWeight={600}> Estado: </Box>
                  <Box w="4px" />
                  <Input
                    size="sm"
                    color="yellow.700"
                    borderColor="gray.400"
                    maxW={{ base: "50%", md: "80%" }}
                    value={formData.estado}
                    onChange={(e) => handleFormChange("estado", e.target.value)}
                  />
                </Flex>
              </SimpleGrid>
              <hr />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleCancel}>
              Cancelar
            </Button>
            <Button colorScheme="yellow" onClick={handleSaveEdicao}>
              Salvar Edição
            </Button>
            <ModalConfirmarEdicao
              isOpen={isNestedModalOpen}
              onClose={handleCloseNestedModal}
              onEditConfirm={handleSubmit}
              dinamicRefresh={dinamicRefresh}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalEditarProntuario;
