import { NextPage } from "next";
import { CSSProperties } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { defaultLetter } from "../../styles/letters";

const Keyboard: NextPage = () => {
  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ]

  const keyboardGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(10, minmax(auto, 3rem))`,
    gridTemplateRows: "repeat(3, 3rem)",
    gap: "0.6rem"
  }

  return (
    <div>
      <Box sx={keyboardGrid} >
        {keyboard.map((keys, line) => keys.map((_, column) => (
          <Box
            key={column}
            sx={defaultLetter}
            style={keyboard[line][column] == "ENTER" ? { gridColumn: "span 3" } : {}}
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

export default Keyboard;