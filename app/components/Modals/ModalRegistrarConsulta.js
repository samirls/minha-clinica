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
import {BsSend} from 'react-icons/bs'

function ModalRegistrarConsulta({ isOpen, onClose, onRegistrarConsulta }) {


  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar Consulta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Deseja registrar esta consulta?</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              rightIcon={<BsSend />}
              colorScheme="whatsapp"
              onClick={() => {
                onRegistrarConsulta();
                onClose(); 
              }}
            >
              Registrar Consulta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalRegistrarConsulta;
