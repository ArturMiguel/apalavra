import { NextPage } from "next";
import { CSSProperties, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LetterFeedbackEnum } from "../../enums/LetterFeedbackEnum";
import { defaultLetter } from "../../styles/letters";
import { LetterDTO } from "../../dtos/LetterDTO";

const Puzzle: NextPage = () => {
  const wordLength = 5;
  const [position, setPosition] = useState<number[]>([0, 0]); // [line, column]
  const [puzzle, setPuzzle] = useState<LetterDTO[][]>(
    Array(6).fill(0).map((_, line) => {
      return Array(wordLength).fill(0).map((_, column) => {
        return {
          line,
          column,
          feedback: LetterFeedbackEnum.DEFAULT,
          guess: null
        }
      });
    })
  );
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ]

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
    gap: "0.6rem"
  }

  function handleKeyboard(line: number, column: number) {
    const key = keyboard[line][column];
    if (key == "ENTER") {

    } else if (key == "⌫") {
      if (position[1] == 0) return;
      const previousColumn = position[1] - 1;
      puzzle[position[0]][previousColumn].guess = null;
      setPosition([position[0], previousColumn]);
    } else {
      if (position[1] == wordLength) return;
      puzzle[position[0]][position[1]].guess = key;
      const nextColumn = position[1] + 1;
      setPosition([position[0], nextColumn]);
    }
  }

  return (
    <div>
      <Box sx={puzzleGrid} >
        {puzzle?.map((word, line) => word.map((_, column) => (
          <Box
            key={column}
            sx={defaultLetter}
          >
            <Paper elevation={position[0] == line && position[1] == column ? 4 : 0}>
              {puzzle[line][column].guess}
            </Paper>
          </Box>
        )))}
      </Box>
      <Box sx={keyboardGrid} >
        {keyboard.map((keys, line) => keys.map((_, column) => (
          <Box
            key={column}
            sx={defaultLetter}
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