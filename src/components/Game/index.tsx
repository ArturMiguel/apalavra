import { useEffect, useState } from "react";
import { GameDTO } from "../../types/GameDTO";
import { GameResultEnum } from "../../types/GameResultEnum";
import { FeedbackEnum } from "../../types/FeedbackEnum";
import { GamePropsDTO } from "../../types/GamePropsDTO";
import styles from "./styles.module.scss";
import GameResultModal from "../GameResultModal";
import { useDisclosure, useToast } from '@chakra-ui/react'
import Confetti from "../Confetti";
import Clock from "../Clock";
import { LocalStorageService } from "../../services/LocalStorageService";

export default function Game({ wordDoc, words }: GamePropsDTO) {
  const { word, sequence } = wordDoc;
  const [game, setGame] = useState<GameDTO[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: word.length }, () => {
      return {
        feedback: FeedbackEnum.DEFAULT,
        key: null
      }
    }))
  );
  const [line, setLine] = useState(0);
  const [column, setColumn] = useState(0);
  const [gameResult, setGameResult] = useState<GameResultEnum>(GameResultEnum.IN_PROGRESS);
  const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫",
    "Z", "X", "C", "V", "B", "N", "M", "ENTER",
  ];
  const [showConfetti, setShowConfetti] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    loadGameFromStorage();
  }, []);

  function loadGameFromStorage() {
    if (sequence != LocalStorageService.getGameSequence()) {
      LocalStorageService.clear();
    } else {
      const { storageGame, storageLine, storageResult } = LocalStorageService.getGameState();
      if (storageGame) {
        setGame(storageGame);
        setLine(storageLine);
        setGameResult(storageResult);
      }
    }
    LocalStorageService.setGameSequence(sequence);
  }

  function handleKeyboard(key: string) {
    if (gameResult != GameResultEnum.IN_PROGRESS) return;
    if (key == "ENTER") return handleEnter();
    if (key == "⌫") return handleClear();
    return handleKey(key);
  }

  function updatePosition(line: number, column: number) {
    setLine(line);
    setColumn(column);
  }

  function handleKey(key: string) {
    if (column == word.length) return;
    const copy = [...game];
    copy[line][column].key = key;
    updatePosition(line, column + 1);
    setGame(copy);
  }

  function handleClear() {
    if (column == 0) return;
    const copy = [...game];
    const previousColumn = column - 1;
    copy[line][previousColumn] = { key: null, feedback: FeedbackEnum.DEFAULT };
    updatePosition(line, previousColumn);
    setGame(copy);
  }

  function handleEnter() {
    if (column != word.length) return;
    const copy = [...game];

    const valid = words.includes(copy[line].map(l => l.key).join(""));
    if (!valid) {
      toast({
        description: "Palavra não encontrada!",
        status: "info",
        duration: 1700,
        isClosable: true,
        variant: "solid"
      });
      return;
    };

    for (let i = 0; i < word.length; i++) {
      copy[line][i].feedback = word[i] == copy[line][i].key ? FeedbackEnum.CORRECT : FeedbackEnum.WRONG;
    }

    for (let i = 0; i < word.length; i++) {
      const ocurrences = word.split("").filter(w => w == copy[line][i].key).length;
      const corrects = copy[line].filter(l => l.feedback == FeedbackEnum.CORRECT && l.key == copy[line][i].key).length;
      const partials = copy[line].filter(l => l.feedback == FeedbackEnum.PARTIAL && l.key == copy[line][i].key).length;
      if (copy[line][i].feedback == FeedbackEnum.WRONG && word.includes(copy[line][i].key) && ocurrences != corrects + partials) {
        copy[line][i].feedback = FeedbackEnum.PARTIAL;
      }
    }

    let auxGameResult = gameResult;
    const corrects = copy[line].filter(l => l.feedback == FeedbackEnum.CORRECT).length;
    if (corrects == word.length || line == 5) {
      if (corrects == word.length) {
        setShowConfetti(true);
        auxGameResult = GameResultEnum.SUCCESS;
      } else {
        auxGameResult = GameResultEnum.FAILED;
      }
      onOpen();
      setGameResult(auxGameResult);
    }

    const nextLine = line + 1;
    updatePosition(nextLine, 0);
    setGame(copy);
    LocalStorageService.setGameState(copy, nextLine, auxGameResult);
  }

  function gameStyle(f: FeedbackEnum) {
    if (f == FeedbackEnum.CORRECT) return styles.correctLetter;
    if (f == FeedbackEnum.WRONG) return styles.wrongLetter;
    if (f == FeedbackEnum.PARTIAL) return styles.partialLetter;
    return styles.defaultLetter;
  }

  function keyboardStyle(key: string) {
    const feedbacks = game.filter(a => a.filter(b => b.key == key).length).map(a => a.filter(b => b.key == key)).map(a => a.map(b => b.feedback)).join();
    if (feedbacks.includes(FeedbackEnum.CORRECT)) {
      return styles.correctLetter;
    } else if (feedbacks.includes(FeedbackEnum.PARTIAL)) {
      return styles.partialLetter;
    } else if (feedbacks.includes(FeedbackEnum.WRONG)) {
      return styles.wrongLetter;
    }
    return styles.defaultLetter;
  }

  return (
    <>
      <Confetti fire={showConfetti} />

      {isOpen && <GameResultModal
        game={game}
        line={line}
        result={gameResult}
        word={word}
        onClose={onClose}
        isOpen={isOpen}
        sequence={sequence}
      />}

      <div className={styles.container} onClick={() => gameResult != GameResultEnum.IN_PROGRESS && onOpen()}>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          Próxima palavra em <Clock />
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${word.length}, 3.5rem)`,
          gridTemplateRows: "repeat(6, 3rem)",
          gap: "0.6rem",
        }}>
          {game.map((pos, l) => pos.map((_, c) => (
            <div key={c} className={gameStyle(pos[c].feedback)} style={{ fontSize: "1.2rem" }}>
              {pos[c].key}
            </div>
          )))}
        </div>
        <div className={styles.keyboard} >
          {keys.map(key => (
            <div key={key} className={keyboardStyle(key)} onClick={() => handleKeyboard(key)}>
              {key}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}