import { Submission } from "../hooks";

const AudioOnly: Submission[] = [
    {
        "paramShared": 94700000,
        "submitName": "HuBERT",
        "AS_20K": 14.3,
        "VGGSound": 30.21,
        "Kinetics_Sounds": 51.46,
        "UCF101": 36.06,
        "LRS3_TED": 2.96,
        "VoxCeleb2": 20.29,
        "IEMOCAP": 62.14
    },
    {
        "paramShared": 0,
        "submitName": "AV-HuBERT",
        "AS_20K": 12.6,
        "VGGSound": 31.14,
        "Kinetics_Sounds": 49.02,
        "UCF101": 38.58,
        "LRS3_TED": 3.01,
        "VoxCeleb2": 14.71,
        "IEMOCAP": 58.54
    },
    {
        "paramShared": 0,
        "submitName": "RepLAI",
        "AS_20K": 12.3,
        "VGGSound": 27.01,
        "Kinetics_Sounds": 45.9,
        "UCF101": 33.85,
        "LRS3_TED": 66.09,
        "VoxCeleb2": 30.4,
        "IEMOCAP": 57.53
    },
    {
        "paramShared": 0,
        "submitName": "AVBERT",
        "AS_20K": 2.6,
        "VGGSound": 4.46,
        "Kinetics_Sounds": 17.86,
        "UCF101": 16.15,
        "LRS3_TED": 84.22,
        "VoxCeleb2": 48.9,
        "IEMOCAP": 45.8
    },
    {
        "paramShared": 0,
        "submitName": "MAViL",
        "AS_20K": 21.6,
        "VGGSound": 39.91,
        "Kinetics_Sounds": 57.28,
        "UCF101": 45.68,
        "LRS3_TED": 24.43,
        "VoxCeleb2": 20.83,
        "IEMOCAP": 59.46
    }
]
const VideoOnly: Submission[] = [
    {
        "paramShared": 0,
        "submitName": "AV-HuBERT",
        "AS_20K": 2.4,
        "VGGSound": 5.9,
        "Kinetics_Sounds": 24.73,
        "UCF101": 37.55,
        "LRS3_TED": 50.91,
        "VoxCeleb2": 17.42,
        "IEMOCAP": 26.59
    },
    {
        "paramShared": 0,
        "submitName": "RepLAI",
        "AS_20K": 5.5,
        "VGGSound": 13.5,
        "Kinetics_Sounds": 46.68,
        "UCF101": 56.69,
        "LRS3_TED": 71.33,
        "VoxCeleb2": 44.44,
        "IEMOCAP": 40.72
    },
    {
        "paramShared": 0,
        "submitName": "AVBERT",
        "AS_20K": 1.5,
        "VGGSound": 2.76,
        "Kinetics_Sounds": 17.86,
        "UCF101": 24.69,
        "LRS3_TED": 80.87,
        "VoxCeleb2": 49.63,
        "IEMOCAP": 33.06
    },
    {
        "paramShared": 0,
        "submitName": "MAViL",
        "AS_20K": 18.0,
        "VGGSound": 32.08,
        "Kinetics_Sounds": 74.01,
        "UCF101": 79.37,
        "LRS3_TED": 74.03,
        "VoxCeleb2": 23.13,
        "IEMOCAP": 43.03
    }
]
const AudioVisualFusion: Submission[] = [
    {
        "paramShared": 0,
        "submitName": "AV-HuBERT",
        "AS_20K": 13.3,
        "VGGSound": 32.69,
        "Kinetics_Sounds": 52.23,
        "UCF101": 41.46,
        "LRS3_TED": 2.75,
        "VoxCeleb2": 14.56,
        "IEMOCAP": 46.45
    },
    {
        "paramShared": 0,
        "submitName": "AVBERT",
        "AS_20K": 2.0,
        "VGGSound": 4.25,
        "Kinetics_Sounds": 20.56,
        "UCF101": 23.46,
        "LRS3_TED": 75.74,
        "VoxCeleb2": 48.78,
        "IEMOCAP": 46.63
    },
    {
        "paramShared": 0,
        "submitName": "MAViL",
        "AS_20K": 26.7,
        "VGGSound": 47.22,
        "Kinetics_Sounds": 79.51,
        "UCF101": 77.98,
        "LRS3_TED": 30.18,
        "VoxCeleb2": 15.94,
        "IEMOCAP": 54.94
    }
]

export const LEADERBOARD = {
    AudioOnly,
    VideoOnly,
    AudioVisualFusion
}