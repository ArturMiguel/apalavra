import { LetterFeedbackEnum } from "../enums/LetterFeedbackEnum";

export interface LetterDTO {
    guess: string | null;
    feedback: LetterFeedbackEnum;
}