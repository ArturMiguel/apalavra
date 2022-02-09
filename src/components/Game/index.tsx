import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Confetti from "../Confetti";
import Keyboard from "../Keyboard";
import { LetterDTO } from "../../types/LetterDTO";
import { GameResultEnum } from "../../types/GameResultEnum";
import { FeedbackEnum } from "../../types/FeedbackEnum";
import { defaultLetterStyle, correctLetterStyle, wrongLetterStyle, partialLetterStyle } from "../../styles/letterStyles";
import styles from "./styles.module.scss";
import { GamePropsDTO } from "../../types/GamePropsDTO";

export default function Game({ word }: GamePropsDTO) {
  const [game, setGame] = useState<LetterDTO[]>(Array.from({ length: word.length * 6 }, () => {
    return {
      guess: null,
      feedback: FeedbackEnum.DEFAULT
    }
  }));
  const [gameResult, setGameResult] = useState<string>();

  function handleKeyboard(key: string) {
    if (key == "ENTER") return handleEnter();
    if (key == "⌫") return handleClear();
    return handleKey(key);
  }

  function getCurrentGuess() {
    const start = game.findIndex(l => l.feedback == FeedbackEnum.DEFAULT && l.guess);
    const end = game.findIndex(l => l.feedback == FeedbackEnum.DEFAULT && !l.guess);
    return game.slice(start, end);
  }

  function handleKey(key: string) {
    if (getCurrentGuess().length == word.length) return;
    const copy = [...game];
    copy[copy.findIndex(value => !value.guess)].guess = key;
    setGame(copy);
  }

  function handleClear() {
    const copy = [...game];
    const index = copy.map(l => l.guess).join("").length - 1;
    if (index < 0 || copy[index].feedback != FeedbackEnum.DEFAULT) return;
    copy[index] = { feedback: FeedbackEnum.DEFAULT, guess: null };
    setGame(copy);
  }

  function handleEnter() {
    const guess = getCurrentGuess();
    if (guess.length != word.length) return;
    const copy = [...game];
    for (let i = 0; i < word.length; i++) {
      let index = copy.findIndex(l => l.feedback == FeedbackEnum.DEFAULT);
      if (word[i] == guess[i].guess) {
        guess[i].feedback = FeedbackEnum.CORRECT;
      } else {
        guess[i].feedback = FeedbackEnum.WRONG;
      }
      copy.splice(index, 1, guess[i]);
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
          gridTemplateColumns: `repeat(${word.length}, minmax(auto, 3.2rem))`,
          gridTemplateRows: "repeat(6, 2.5rem)",
          gap: "0.6rem",
        }} >
          {game.map((letter, index) => (
            <Box key={index} sx={() => letterStyle(letter.feedback)}>
              <Paper elevation={game.map(l => l.guess).join("").length == index && getCurrentGuess().length != word.length ? 4 : 0}>
                <div className={styles.letter}>
                  {game[index].guess}
                </div>
              </Paper>
            </Box>
          ))}
        </Box>
        <Keyboard handleKeyboard={handleKeyboard} />
      </div>
    </>
  )
}