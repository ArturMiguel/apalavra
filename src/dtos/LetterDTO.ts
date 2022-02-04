import { LetterFeedbackEnum } from "../enums/LetterFeedbackEnum";

export interface LetterDTO {
    line: number;
    column: number;
    guess: string | null;
    feedback: LetterFeedbackEnum;
}