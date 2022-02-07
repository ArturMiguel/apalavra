import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LetterFeedbackEnum } from "../../types/LetterFeedbackEnum";
import { defaultLetterStyle, correctLetterStyle, wrongLetterStyle, partialLetterStyle } from "../../styles/letterStyles";
import { LetterDTO } from "../../types/LetterDTO";
import styles from "./styles.module.scss";
import Confetti from "../Confetti";
import { GameResultEnum } from "../../types/GameResultEnum";
import Keyboard from "../Keyboard";

export default function Game({ word }) {
  const [game, setGame] = useState<LetterDTO[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: word.length }, () => {
      return {
        feedback: LetterFeedbackEnum.DEFAULT,
        guess: null
      }
    }))
  );
  const [line, setLine] = useState(0);
  const [column, setColumn] = useState(0);
  const [gameResult, setGameResult] = useState<string>();

  function handleKeyboard(key: string) {
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
    copy[line][column].guess = key;
    updatePosition(line, column + 1);
    setGame(copy);
  }

  function handleClear() {
    if (column == 0 || gameResult == GameResultEnum.SUCCESS || gameResult == GameResultEnum.FAILED) return;
    const copy = [...game];
    const previousColumn = column - 1;
    copy[line][previousColumn].guess = null;
    copy[line][previousColumn].feedback = LetterFeedbackEnum.DEFAULT;
    updatePosition(line, previousColumn);
    setGame(copy);
  }

  function handleEnter() {
    const copy = [...game];
    const guess = copy[line].map(line => line.guess).join("");
    if (guess.length != word.length) return;
    let totalCorrect = 0;
    for (let c = 0; c < word.length; c++) {
      if (!word.includes(guess[c])) {
        copy[line][c].feedback = LetterFeedbackEnum.WRONG;
      } else if (word[c] == guess[c]) {
        copy[line][c].feedback = LetterFeedbackEnum.CORRECT;
        totalCorrect++;
      } else {
        copy[line][c].feedback = LetterFeedbackEnum.PARTIAL;
      }
    }
    setGame(copy);
    if (totalCorrect == word.length) {
      setGameResult(GameResultEnum.SUCCESS);
      return;
    }
    if (line == 5) setGameResult(GameResultEnum.FAILED);
    updatePosition(line + 1, 0);
  }

  function letterStyle(feedback: LetterFeedbackEnum) {
    if (feedback == LetterFeedbackEnum.CORRECT) return correctLetterStyle;
    if (feedback == LetterFeedbackEnum.WRONG) return wrongLetterStyle;
    if (feedback == LetterFeedbackEnum.PARTIAL) return partialLetterStyle;
    return defaultLetterStyle;
  }

  return (
    <>
      {(gameResult == GameResultEnum.SUCCESS) && <Confetti />}
      <div className={styles.container}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${word.length}, minmax(auto, 3.2rem))`,
          gridTemplateRows: "repeat(6, 2.5rem)",
          gap: "0.6rem",
        }} >
          {game.map((_word, l) => _word.map((_, c) => (
            <Box key={c} sx={() => letterStyle(game[l][c].feedback)}>
              <Paper elevation={l == line && c == column ? 4 : 0}>
                <div className={styles.letter}>
                  {game[l][c].guess}
                </div>
              </Paper>
            </Box>
          )))}
        </Box>
        <Keyboard handleKeyboard={handleKeyboard} />
      </div>
    </>
  )
}