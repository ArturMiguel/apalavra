import { FeedbackEnum } from "../types/FeedbackEnum"
import { GameResultEnum } from "../types/GameResultEnum";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import copy from "copy-to-clipboard";
import Clock from "./Clock";

export default function GameResultModal({ game, result, line, word, isOpen, onClose, sequence }) {
  const toast = useToast();

  const shareText = game.slice(0, line).map((pos, l) => pos.map((_, c) => {
    let str = "";
    if (pos[c].feedback == FeedbackEnum.CORRECT) str += "🟩";
    else if (pos[c].feedback == FeedbackEnum.PARTIAL) str += "🟧";
    else if (pos[c].feedback == FeedbackEnum.WRONG) str += "⬛";
    if (c == word.length - 1 && l != line) str += "\n";
    return str;
  })).join().replace(/,/g, "");

  function handleShare() {
    const msg = `Joguei https://apalavra.app #${sequence}\n\nTentativa ${line}/6\n\n${shareText}`
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
        <ModalBody>
          <Stack spacing="0.5rem" textAlign="center">
            <div>
              <h1 style={{ fontSize: "2rem" }}>
                {result == GameResultEnum.SUCCESS ? "Você acertou!" : "Você não acertou!"}
              </h1>
            </div>
            <div>A palavra era: <b>{word}</b></div>
            <div>Tentativa: {line} de 6</div>
            <div>
              <p>Próxima palavra em:</p>
              <Clock style={{ fontSize: "2rem" }} />
            </div>
          </Stack>
        </ModalBody>
        <ModalFooter alignItems="center">
          <Stack textAlign="center" width="100%">
            <Button colorScheme="blue" onClick={handleShare}>
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