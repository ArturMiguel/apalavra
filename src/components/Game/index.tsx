import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Confetti from "../Confetti";
import { GuessDTO } from "../../types/GuessDTO";
import { GameResultEnum } from "../../types/GameResultEnum";
import { FeedbackEnum } from "../../types/FeedbackEnum";
import { GamePropsDTO } from "../../types/GamePropsDTO";
import { defaultLetterStyle, correctLetterStyle, wrongLetterStyle, partialLetterStyle } from "../../styles/letterStyles";
import styles from "./styles.module.scss";

export default function Game({ word }: GamePropsDTO) {
  const [game, setGame] = useState<GuessDTO[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: word.length }, () => {
      return {
        feedback: FeedbackEnum.DEFAULT,
        key: null
      }
    }))
  );
  const [line, setLine] = useState(0);
  const [column, setColumn] = useState(0);
  const [gameResult, setGameResult] = useState<string>(null);
  const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫",
    "Z", "X", "C", "V", "B", "N", "M", "ENTER",
  ];

  function handleKeyboard(key: string) {
    if (gameResult) return;
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
    for (let i = 0; i < word.length; i++) {
      copy[line][i].feedback = word[i] == copy[line][i].key ? FeedbackEnum.CORRECT : FeedbackEnum.WRONG;
    }
    for (let i = 0; i < word.length; i++) {
      const ocurrences = word.split("").filter(w => w == copy[line][i].key).length;
      const corrects = copy[line].filter(l => l.feedback == FeedbackEnum.CORRECT && l.key == copy[line][i].key).length;
      const partials = copy[line].filter(l => l.feedback == FeedbackEnum.PARTIAL && l.key == copy[line][i].key).length;
      if (copy[line][i].feedback == FeedbackEnum.WRONG && word.includes(copy[line][i].key) && ocurrences != corrects && ocurrences != partials) {
        copy[line][i].feedback = FeedbackEnum.PARTIAL;
      }
    }
    const corrects = copy[line].filter(l => l.feedback == FeedbackEnum.CORRECT).length;
    if (corrects == word.length || line == 5) {
      setGameResult(corrects == word.length ? GameResultEnum.SUCCESS : GameResultEnum.FAILED);
    } else {
      updatePosition(line + 1, 0);
    }
    setGame(copy);
  }

  function letterStyle(f: FeedbackEnum) {
    if (f == FeedbackEnum.CORRECT) return correctLetterStyle;
    if (f == FeedbackEnum.WRONG) return wrongLetterStyle;
    if (f == FeedbackEnum.PARTIAL) return partialLetterStyle;
    return defaultLetterStyle;
  }

  return (
    <>
      {(gameResult == GameResultEnum.SUCCESS) && <Confetti />}
      <div className={styles.container}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${word.length}, minmax(auto, 3.5rem))`,
          gridTemplateRows: "repeat(6, 3rem)",
          gap: "0.6rem",
        }} >
          {game.map((pos, l) => pos.map((_, c) => (
            <Box key={c} sx={() => letterStyle(pos[c].feedback)}>
              <Paper elevation={l == line && c == column ? 4 : 0}>
                <div className={styles.letter}>
                  {pos[c].key}
                </div>
              </Paper>
            </Box>
          )))}
        </Box>
        <div className={styles.keyboard} >
          {keys.map(key => (
            <Box
              key={key}
              sx={() => letterStyle(FeedbackEnum.DEFAULT)}
              style={key == "ENTER" ? { gridColumn: "span 3" } : {}}
              onClick={() => handleKeyboard(key)}
            >
              <Paper elevation={0}>
                {key}
              </Paper>
            </Box>
          ))}
        </div>
      </div>
    </>
  )
}