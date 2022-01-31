import type { NextPage } from "next";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styles from "../styles/index.module.scss";
import { CSSProperties, useState } from "react";
import { defaultLetter, correctLetter, wrongLetter, partialLetter } from "../styles/letters";
import { LetterFeedbackEnum } from "../enums/LetterFeedbackEnum";

const Home: NextPage = () => {
  const wordLength = 5;
  const puzzle = Array(6).fill(0).map(_ => Array(wordLength).fill(LetterFeedbackEnum.DEFAULT));

  const puzzleGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${wordLength}, minmax(auto, 3rem))`,
    gridTemplateRows: "repeat(6, 3rem)",
    gap: "0.6rem"
  }

  return (
    <div className={styles.container} >
      <Box sx={puzzleGrid} >
        {puzzle.map((word, line) => word.map((_, column) => (
          <Box
            key={column}
            sx={defaultLetter}
            onClick={() => console.log(`Line ${line}, column ${column}`)}
          >
            <Paper elevation={0}>
              
            </Paper>
          </Box>
        )))}
      </Box>
    </div>
  )
}

export default Home;