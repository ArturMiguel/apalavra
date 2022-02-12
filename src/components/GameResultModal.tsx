import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FeedbackEnum } from "../types/FeedbackEnum"
import { GameResultEnum } from "../types/GameResultEnum";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShareIcon from '@mui/icons-material/Share';
import { GameResultModalProps } from "../types/GameResultModalProps";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function GameResultModal({ game, result, line, show, onClose, word }: GameResultModalProps) {
  function emoticon() {
    return game.slice(0, line + 1).map((pos, l) => pos.map((_, c) => {
      let str = "";
      if (pos[c].feedback == FeedbackEnum.CORRECT) str += `🟩`;
      else if (pos[c].feedback == FeedbackEnum.PARTIAL) str += "🟧";
      else if (pos[c].feedback == FeedbackEnum.WRONG) str += "⬛";
      if (c == word.length - 1 && l != line) str += "\n";
      return str;
    })).join().replace(/,/g, "");
  }

  return (
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
          <div>
            {result == GameResultEnum.SUCCESS ? `"${word}"` : `A palavra era "${word}"`}
          </div>
          <textarea
            defaultValue={emoticon()}
            disabled
            style={{
              resize: "none",
              overflow: "hidden",
              border: "none",
              height: `${line + 1 * 2}rem`
            }}
          />
          <Button variant="contained" endIcon={<ShareIcon />}>
            Compartilhar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Fechar
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}