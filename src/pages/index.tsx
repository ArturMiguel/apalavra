import type { NextPage } from "next";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styles from "../styles/index.module.scss";
import { CSSProperties, useState } from "react";

const Home: NextPage = () => {
  const word = "VASCO";
  const [activeWord, setActiveWord] = useState<number>();

  const puzzleGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${word.length}, minmax(auto, 4rem))`,
    gridTemplateRows: "repeat(6, 4rem)",
    gap: "0.5rem"
  }

  return (
    <div className={styles.container} >
      <Box sx={puzzleGrid} >
        {Array.from(Array(word.length * 6)).map((_, index) => (
          <Box
            key={index}
            sx={{
              "& > :not(style)": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                border: "1px solid grey",
                cursor: "pointer",
                background: "green",
                fontWeight: "bold"
              }
            }}
            onClick={() => setActiveWord(index)}
          >
            <Paper elevation={activeWord == index ? 3 : 0}>
              {index}
            </Paper>
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default Home;