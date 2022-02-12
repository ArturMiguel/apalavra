import { GameResultEnum } from "./GameResultEnum";
import { GuessDTO } from "./GuessDTO";

export interface GameResultModalProps {
  game: GuessDTO[][];
  result: GameResultEnum;
  line: number;
  show: boolean;
  onClose: any;
  word: string;
}