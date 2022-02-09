import { FeedbackEnum } from "./FeedbackEnum";

export interface LetterDTO {
    guess: string | null;
    feedback: FeedbackEnum;
}