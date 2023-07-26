import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  UnorderedList,
  ListItem,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function ModalConfirmarDeletarProntuario({ isOpen, onClose, onDeleteConfirm }) {
  const [confirmText, setConfirmText] = useState("");

  const isConfirmationValid = () => {
    return confirmText.trim().toLowerCase() === "deletar";
  };

  const handleConfirm = () => {
    if (isConfirmationValid()) {
      onDeleteConfirm();
      onClose();
    }
  };

  return (
    <div>
      <Modal size="md" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação Final</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={18} fontWeight={700} color="red">
              Você está deletando Prontuario e Consultas.
            </Text>
            <Text>Digite abaixo DELETAR e clique no botão de confirmar:</Text>
            <Input
              borderColor="gray.400"
              value={confirmText}
              size="sm"
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={handleConfirm}
              isDisabled={!isConfirmationValid()}
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalConfirmarDeletarProntuario;
