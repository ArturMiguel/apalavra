import { FeedbackEnum } from "../types/FeedbackEnum"
import { GameResultEnum } from "../types/GameResultEnum";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import copy from "copy-to-clipboard";

export default function GameResultModal({ game, result, line, word, isOpen, onClose }) {
  const toast = useToast();

  const shareText = game.slice(0, line + 1).map((pos, l) => pos.map((_, c) => {
    let str = "";
    if (pos[c].feedback == FeedbackEnum.CORRECT) str += "🟩";
    else if (pos[c].feedback == FeedbackEnum.PARTIAL) str += "🟧";
    else if (pos[c].feedback == FeedbackEnum.WRONG) str += "⬛";
    if (c == word.length - 1 && l != line) str += "\n";
    return str;
  })).join().replace(/,/g, "");

  function handleShare() {
    const msg = `Joguei apalavra.vercel.app\n\nTentativa ${line + 1}/6\n\n${shareText}`
    copy(msg);
    onClose();
    toast({
      description: "Copiado. Cole em alguma área de texto.",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "solid"
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {result == GameResultEnum.SUCCESS ? "Parabéns. Você acertou!" : "Que pena. Você falhou!"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {result == GameResultEnum.FAILED && <div style={{ textAlign: "center" }}>A palavra era &quot;{word}&quot;</div>}
        </ModalBody>

        <ModalFooter alignItems="center">
          <Stack textAlign="center" width="100%">
            <Button colorScheme="blue" mr={3} onClick={handleShare}>
              Copiar resultado
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}