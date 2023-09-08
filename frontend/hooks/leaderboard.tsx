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

export interface MergeData {
    AS_20K: number | string;
    VGGSound: number | string;
    Kinetics_Sounds: number | string;
    UCF101: number | string;
    LRS3_TED: number | string;
    VoxCeleb2: number | string;
    IEMOCAP: number | string;
}

export type MergeSubmission = {
    paramShared: number;
    submitName: string;
} & {
        [key in TrackCollection]: MergeData;
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

export enum Track {
    AudioOnly = "Audio-only",
    VideoOnly = "Video-only",
    AudioVisualFusion = "Audio-Visual Fusion",
    MergeData = "Merge Data"
}

export enum TrackCollection {
    AudioOnly = "Audio-only",
    VideoOnly = "Video-only",
    AudioVisualFusion = "Audio-Visual Fusion"
}

