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
  useToast,
  useDisclosure,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import ModalConfirmarDeletarProntuario from "./ModalConfirmarDeletarProntuario";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

function ModalDeletarProntuario({ isOpen, onClose, id }) {
  const toast = useToast();
  const token = Cookies.get("token");
  const router = useRouter();
  const {
    isOpen: isNestedModalOpen,
    onOpen: handleOpenNestedModal,
    onClose: handleCloseNestedModal,
  } = useDisclosure();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/prontuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "Deletar Prontuário:",
          description: "Prontuário deletado com sucesso!",
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        onClose();
        router.push('/dashboard');
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: "Algo de errado aconteceu. Tente novamente.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deletar Prontuário e Consultas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={25} fontWeight={700} color="red">
              Atenção:
            </Text>
            Deseja realmente deletar o Prontuário e todas as consultas a ele
            vinculadas?
            <UnorderedList>
              <ListItem>
                Este procedimento é{" "}
                <Text as="span" color="red" fontWeight={700}>
                  irreversível
                </Text>
                ;
              </ListItem>
              <ListItem>
                Não é recomendado apagar prontuários, e sim{" "}
                <Text as="span" color="yellow.600">
                  editá-los
                </Text>
                ;
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleOpenNestedModal}>
              Deletar
            </Button>
            <ModalConfirmarDeletarProntuario
              isOpen={isNestedModalOpen}
              onClose={handleCloseNestedModal}
              onDeleteConfirm={handleDelete}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalDeletarProntuario;
