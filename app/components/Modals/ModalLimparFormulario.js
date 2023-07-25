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
  Lorem,
} from "@chakra-ui/react";

function ModalLimparFormulario({ isOpen, onClose, onClearForm }) {


  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Limpar Formulário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Deseja limpar todos os dados do formulário?</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClearForm();
                onClose(); 
              }}
            >
              Limpar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalLimparFormulario;
