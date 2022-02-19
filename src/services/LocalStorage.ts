import { GameDTO } from "../types/GameDTO";
import { GameResultEnum } from "../types/GameResultEnum";

const GAME_KEY = "current_game";
const GAME_LINE_KEY = "current_game_line";
const GAME_RESULT_KEY = "current_game_result";

export class LocalStorage {
  static setGameState(game: GameDTO[][], line: number, result: GameResultEnum) {
    localStorage.setItem(GAME_KEY, JSON.stringify(game));
    localStorage.setItem(GAME_LINE_KEY, line.toString());
    localStorage.setItem(GAME_RESULT_KEY, result);
  }

  static getGameState() {
    try {
      const storageGame = JSON.parse(localStorage.getItem(GAME_KEY)) as GameDTO[][];
      const storageLine = parseInt(localStorage.getItem(GAME_LINE_KEY));
      const storageResult = localStorage.getItem(GAME_RESULT_KEY) as GameResultEnum;

      return {
        storageGame: storageGame,
        storageLine: storageLine,
        storageResult: storageResult
      }
    } catch (e) {
      return null;
    }
  }
}