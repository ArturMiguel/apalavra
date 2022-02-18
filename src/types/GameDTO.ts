import { FeedbackEnum } from "./FeedbackEnum";

export interface GameDTO {
    key: string | null;
    feedback: FeedbackEnum;
}