import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { GoQuestion } from "react-icons/go"
import { FeedbackEnum } from "../types/FeedbackEnum"
import styles from "../components/Game/styles.module.scss";

export default function HelpModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function gameStyle(f: FeedbackEnum) {
    if (f == FeedbackEnum.CORRECT) return styles.correctLetter;
    if (f == FeedbackEnum.WRONG) return styles.wrongLetter;
    if (f == FeedbackEnum.PARTIAL) return styles.partialLetter;
    return styles.defaultLetter;
  }

  return (
    <>
      <GoQuestion size="1.7rem" title="Instruções" cursor="pointer" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajuda</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              A cada dia é disponibilizada uma palavra para você descobrir em 6 tentativas. A palavra pode ter 5 ou 6 letras e existe na lingua portuguesa (pt-BR).
            </p>
            <p>
              <b>Exemplos:</b>
            </p>
            <div>
              <div className={gameStyle(FeedbackEnum.CORRECT)} style={{ fontSize: "1.2rem" }}>
                A
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}