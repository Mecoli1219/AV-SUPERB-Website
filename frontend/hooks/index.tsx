export * from './leaderboard';
export * from './profile';

export enum TrackCollection {
    AudioOnly = "Audio-only",
    VideoOnly = "Video-only",
    AudioVisualFusion = "Audio-Visual Fusion"
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