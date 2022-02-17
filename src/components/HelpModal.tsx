import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
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
          <ModalHeader>Instruções</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              A cada dia é publicada uma palavra para você descobrir em 6 tentativas.
              A palavra existe na lingua portuguesa (pt-BR) e pode ter 5 ou 6 letras.
            </p>
            <br />
            <div>
              <p style={{ marginBottom: "0.5rem" }}>As letras <b>corretas</b> serão coloridas de verde:</p>
              <HStack spacing="0.2rem">
                {"CERTA".split("").map((v, i) => <div key={i} className={gameStyle(FeedbackEnum.CORRECT)} style={{ fontSize: "1.2rem", width: "2rem" }}>{v}</div>)}
              </HStack>
            </div>
            <br />
            <div>
              <p style={{ marginBottom: "0.5rem" }}>As letras <b>corretas, porém na posição errada,</b> serão coloridas de laranja:</p>
              <HStack spacing="0.2rem">
                {"QUASE".split("").map((v, i) => <div key={i} className={gameStyle(FeedbackEnum.PARTIAL)} style={{ fontSize: "1.2rem", width: "2rem" }}>{v}</div>)}
              </HStack>
            </div>
            <br />
            <div>
              <p style={{ marginBottom: "0.5rem" }}>As letras <b>erradas</b> serão coloridas de preto:</p>
              <HStack spacing="0.2rem">
                {"ERRADA".split("").map((v, i) => <div key={i} className={gameStyle(FeedbackEnum.WRONG)} style={{ fontSize: "1.2rem", width: "2rem" }}>{v}</div>)}
              </HStack>
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