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
} from "@chakra-ui/react";

function ModalConfirmarEdicao({ isOpen, onClose, onEditConfirm, dinamicRefresh }) {


  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirme a Edição de Prontuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Deseja realmente editar o Prontuário?</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => {
                onEditConfirm();
                onClose();
                dinamicRefresh(); 
              }}
            >
              Confirmar Edição
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalConfirmarEdicao;