import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { defaultLetterStyle } from "../../styles/letterStyles";
import styles from "./styles.module.scss";

export default function Keyboard({ handleKeyboard }) {
  const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫",
    "Z", "X", "C", "V", "B", "N", "M", "ENTER",
  ];

  return (
    <div className={styles.keyboard} >
      {keys.map(key => (
        <Box
          key={key}
          sx={defaultLetterStyle}
          style={key == "ENTER" ? { gridColumn: "span 3" } : {}}
          onClick={() => handleKeyboard(key)}
        >
          <Paper elevation={0}>
            {key}
          </Paper>
        </Box>
      ))}
    </div>
  )
}