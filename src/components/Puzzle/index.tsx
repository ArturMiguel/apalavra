import { NextPage } from "next";
import { CSSProperties, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LetterFeedbackEnum } from "../../enums/LetterFeedbackEnum";
import { defaultLetterStyle, correctLetterStyle, wrongLetterStyle, partialLetterStyle } from "./letterStyles";
import { LetterDTO } from "../../dtos/LetterDTO";
import styles from "./styles.module.scss";

const Puzzle: NextPage = () => {
  const wordLength = 5;
  const word = "VASCO";
  const [currentLine, setCurrentLine] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [puzzle, setPuzzle] = useState<LetterDTO[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: wordLength }, () => {
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
  const [endedGame, setEndedGame] = useState(false);

  const puzzleGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${wordLength}, minmax(auto, 3rem))`,
    gridTemplateRows: "repeat(6, 3rem)",
    gap: "0.6rem",
  }

  const keyboardGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(10, minmax(auto, 3rem))`,
    gridTemplateRows: "repeat(3, 3rem)",
    gap: "0.6rem",
    marginTop: "1rem"
  }

  function updatePosition(line: number, column: number) {
    setCurrentLine(line);
    setCurrentColumn(column);
  }

  function handleKeyboard(line: number, column: number) {
    if (endedGame) return;
    const key = keyboard[line][column];
    const copy = [...puzzle];
    if (key == "ENTER") {
      const guess = copy[currentLine].map(line => line.guess).join("");
      if (guess.length != wordLength) return;
      let totalCorrect = 0;
      for (let c = 0; c < wordLength; c++) {
        if (!word.includes(guess[c])) {
          copy[currentLine][c].feedback = LetterFeedbackEnum.WRONG;
        } else if (word[c] == guess[c]) {
          copy[currentLine][c].feedback = LetterFeedbackEnum.CORRECT;
          totalCorrect++;
        } else {
          copy[currentLine][c].feedback = LetterFeedbackEnum.PARTIAL;
        }
      }
      if (totalCorrect == wordLength) {
        setEndedGame(true);
        return;
      }
      if (currentLine == 5) setEndedGame(true);
      setPuzzle(copy);
      updatePosition(currentLine + 1, 0);
    } else if (key == "⌫") {
      if (currentColumn == 0) return;
      const previousColumn = currentColumn - 1;
      updatePosition(currentLine, previousColumn);
      copy[currentLine][previousColumn].guess = null;
      copy[currentLine][previousColumn].feedback = LetterFeedbackEnum.DEFAULT;
      setPuzzle(copy);
    } else {
      if (currentColumn == wordLength) return;
      const nextColumn = currentColumn + 1;
      updatePosition(currentLine, nextColumn);
      copy[currentLine][currentColumn].guess = key;
      setPuzzle(copy);
    }
  }

  return (
    <div className={styles.container}>
      <Box sx={puzzleGrid} >
        {puzzle.map((word, line) => word.map((_, column) => (
          <Box
            key={column}
            sx={() => {
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
              {puzzle[line][column].guess}
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
  )
}

export default Puzzle;