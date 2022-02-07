import { LetterFeedbackEnum } from "./LetterFeedbackEnum";

export interface LetterDTO {
    guess: string | null;
    feedback: LetterFeedbackEnum;
}