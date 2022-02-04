import { NextPage } from "next";
import { CSSProperties, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LetterFeedbackEnum } from "../../enums/LetterFeedbackEnum";
import { defaultLetter } from "../../styles/letters";
import styles from "./styles.module.scss";
import Keyboard from "../Keyboard";

const Puzzle: NextPage = () => {
  const wordLength = 5;
  const puzzle = Array(6).fill(0).map(_ => Array(wordLength).fill(LetterFeedbackEnum.DEFAULT));
  const [position, setPosition] = useState([0, 0]);

  function handlePosition(line: number, column: number) {
    setPosition([line, column]);
  }

  const puzzleGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${wordLength}, minmax(auto, 3rem))`,
    gridTemplateRows: "repeat(6, 3rem)",
    gap: "0.6rem",
  }

  return (
    <div>
      <Box sx={puzzleGrid} >
        {puzzle.map((word, line) => word.map((_, column) => (
          <Box
            key={column}
            sx={defaultLetter}
            onClick={() => handlePosition(line, column)}
          >
            <Paper elevation={position[0] == line && position[1] == column ? 3 : 0}>

            </Paper>
          </Box>
        )))}
      </Box>
      <Keyboard />
    </div>
  )
}

export default Puzzle;