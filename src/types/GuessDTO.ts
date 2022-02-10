import { FeedbackEnum } from "./FeedbackEnum";

export interface GuessDTO {
    key: string | null;
    feedback: FeedbackEnum;
}