import { AxiosResponse } from "axios";
import axios from "./instance";
import { TrackCollection, MergeData } from ".";

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
export const getLeaderboard = async (): Promise<AxiosResponse<LeaderBoardResponse>> =>
    await axios.get("/api/submission/leaderboard")

export enum Track {
    AudioOnly = "Audio-only",
    VideoOnly = "Video-only",
    AudioVisualFusion = "Audio-Visual Fusion",
    MergeData = "Merge Data"
}



