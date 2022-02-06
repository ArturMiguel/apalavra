import { CSSProperties, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LetterFeedbackEnum } from "../../types/enums/LetterFeedbackEnum";
import { defaultLetterStyle, correctLetterStyle, wrongLetterStyle, partialLetterStyle } from "./letterStyles";
import { LetterDTO } from "../../types/dtos/LetterDTO";
import styles from "./styles.module.scss";
import Confetti from "../Confetti";
import { StatusGameEnum } from "../../types/enums/StatusGameEnum";

export default function Puzzle({ word }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [puzzle, setPuzzle] = useState<LetterDTO[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: word.noAccent.length }, () => {
      return {
        feedback: LetterFeedbackEnum.DEFAULT,
        guess: null
      }
    }))
  );
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ];
  const [gameResult, setGameResult] = useState<string>();

  const puzzleGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${word.noAccent.length}, minmax(auto, 3.2rem))`,
    gridTemplateRows: "repeat(6, 2.5rem)",
    gap: "0.6rem",
  }

  const keyboardGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(10, minmax(auto, 2rem))`,
    gridTemplateRows: "repeat(3, 2.5rem)",
    gap: "0.5rem",
    marginTop: "1rem"
  }

  function updatePosition(line: number, column: number) {
    setCurrentLine(line);
    setCurrentColumn(column);
  }

  function handleKeyboard(line: number, column: number) {
    if (gameResult) return;
    const key = keyboard[line][column];
    const copy = [...puzzle];
    if (key == "ENTER") {
      const guess = copy[currentLine].map(line => line.guess).join("");
      if (guess.length != word.noAccent.length) return;
      let totalCorrect = 0;
      for (let c = 0; c < word.noAccent.length; c++) {
        if (!word.noAccent.includes(guess[c])) {
          copy[currentLine][c].feedback = LetterFeedbackEnum.WRONG;
        } else if (word.noAccent[c] == guess[c]) {
          copy[currentLine][c].feedback = LetterFeedbackEnum.CORRECT;
          totalCorrect++;
        } else {
          copy[currentLine][c].feedback = LetterFeedbackEnum.PARTIAL;
        }
      }
      setPuzzle(copy);
      if (totalCorrect == word.noAccent.length) {
        setGameResult(StatusGameEnum.SUCCESS);
        return;
      }
      if (currentLine == 5) setGameResult(StatusGameEnum.FAILED);
      updatePosition(currentLine + 1, 0);
    } else if (key == "⌫") {
      if (currentColumn == 0) return;
      const previousColumn = currentColumn - 1;
      copy[currentLine][previousColumn].guess = null;
      copy[currentLine][previousColumn].feedback = LetterFeedbackEnum.DEFAULT;
      updatePosition(currentLine, previousColumn);
      setPuzzle(copy);
    } else {
      if (currentColumn == word.noAccent.length) return;
      const nextColumn = currentColumn + 1;
      copy[currentLine][currentColumn].guess = key;
      updatePosition(currentLine, nextColumn);
      setPuzzle(copy);
    }
  }

  return (
    <>
      {(gameResult == StatusGameEnum.SUCCESS) && <Confetti />}
      <div className={styles.container}>
        <Box sx={puzzleGrid} >
          {puzzle.map((_word, line) => _word.map((_, column) => (
            <Box key={column} sx={() => {
              const feedback = puzzle[line][column].feedback;
              switch (feedback) {
                case LetterFeedbackEnum.CORRECT:
                  return correctLetterStyle;
                case LetterFeedbackEnum.WRONG:
                  return wrongLetterStyle;
                case LetterFeedbackEnum.PARTIAL:
                  return partialLetterStyle;
                default:
                  return defaultLetterStyle;
              }
            }}
            >
              <Paper elevation={currentLine == line && currentColumn == column ? 4 : 0}>
                <div className={styles.letter}>
                  {puzzle[line][column].guess}
                </div>
              </Paper>
            </Box>
          )))}
        </Box>
        <Box sx={keyboardGrid} >
          {keyboard.map((keys, line) => keys.map((_, column) => (
            <Box
              key={column}
              sx={defaultLetterStyle}
              style={keyboard[line][column] == "ENTER" ? { gridColumn: "span 3" } : {}}
              onClick={() => handleKeyboard(line, column)}
            >
              <Paper elevation={0}>
                {keyboard[line][column]}
              </Paper>
            </Box>
          )))}
        </Box>
      </div>
    </>
  )
}