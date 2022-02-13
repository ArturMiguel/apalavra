import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FeedbackEnum } from "../types/FeedbackEnum"
import { GameResultEnum } from "../types/GameResultEnum";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { GameResultModalProps } from "../types/GameResultModalProps";
import Snackbar from "./Snackbar";
import { useState } from "react";

export default function GameResultModal({ game, result, line, show, onClose, word }: GameResultModalProps) {
  const [showShareAlert, setShowShareAlert] = useState(false);

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
    navigator.clipboard.writeText(msg);
    onClose();
    setShowShareAlert(true);
  }

  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
        }}>
          <Stack direction="column" spacing={2}>
            <div>
              {result == GameResultEnum.SUCCESS ? "Parabéns. Você acertou!" : "Que pena. Você falhou!"}
            </div>
            {result == GameResultEnum.FAILED && <div style={{ textAlign: "center" }}>A palavra era &quot;{word}&quot;</div>}
            <textarea
              defaultValue={shareText}
              disabled
              style={{
                resize: "none",
                overflow: "hidden",
                border: "none",
                height: `${line + 1 * 2}rem`,
                textAlign: "center"
              }}
            />
            <Button variant="contained" onClick={handleShare}>
              Copiar resultado
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Fechar
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        message="Copiado. Cole em alguma área de texto."
        open={showShareAlert}
        onClose={() => setShowShareAlert(false)}
      />
    </>
  )
}