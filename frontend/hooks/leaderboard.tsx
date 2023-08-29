import { AxiosResponse } from "axios";
import axios from "./instance";

export enum Task {
    CONSTRAINED = "CONSTRAINED",
    UNCONSTRAINED = "UNCONSTRAINED",
    LESS_CONSTRAINED = "LESS_CONSTRAINED",
}
export interface Submission {
    paramShared: number;
    submitName: string;
    AS_20K: number;
    VGGSound: number;
    Kinetics_Sounds: number;
    UCF101: number;
    LRS3_TED: number;
    VoxCeleb2: number;
    IEMOCAP: number;
}
export type LeaderBoardResponse = {
    leaderboard: {
        audioOnly: Submission[];
        videoOnly: Submission[];
        audioVisualFusion: Submission[];
    }
}
export const getLeaderboard = async (): Promise<AxiosResponse<LeaderBoardResponse>> => await axios
    .get("/api/submission/leaderboard")
