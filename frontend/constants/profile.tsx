import { MergeData, MergeInfoSubmission, SubmissionInfo } from "../hooks";



export const KEY_NAME: keyof SubmissionInfo = "aoeTimeUpload"
export const SHOWN_VALUES: [keyof SubmissionInfo, string, boolean, number][] = [
    ["submitName", "Method", true, 0],
    ["paramShared", "Params", true, -1],
    ["modelDesc", "Description", false, 0],
    ["state", "State", true, 0],
    ["stateInfo", "State Info", false, 0],
    ["showOnLeaderboard", "Show", true, 0],
]
export const DATA_VALUES: [keyof SubmissionInfo, string, string, number][] = [
    ["AS_20K", "AS_20K", "mAP", 1],
    ["VGGSound", "VGGSound", "Acc.", 1],
    ["Kinetics_Sounds", "Kinetics_Sounds", "Acc.", 1],
    ["UCF101", "UCF101", "Acc.", 1],
    ["LRS3_TED", "LRS3_TED", "CER", -1],
    ["VoxCeleb2", "VoxCeleb2", "EER", -1],
    ["IEMOCAP", "IEMOCAP", "Acc.", 1],
]
export const MERGE_KEY_NAME: keyof MergeInfoSubmission = "aoeTimeUpload"
export const MERGE_SHOWN_VALUES: [keyof MergeInfoSubmission, string, boolean, number][] = [
    ["submitName", "Method", true, 0],
    ["paramShared", "Params", true, -1],
    ["modelDesc", "Description", false, 0],
    ["state", "State", true, 0],
    ["stateInfo", "State Info", false, 0],
    ["showOnLeaderboard", "Show", true, 0],
]
export const MERGE_DATA_VALUES: [keyof MergeData, string, string, number, boolean][] = [
    ["AS_20K", "AS_20K", "mAP", 1, false],
    ["VGGSound", "VGGSound", "Acc.", 1, false],
    ["Kinetics_Sounds", "Kinetics_Sounds", "Acc.", 1, false],
    ["UCF101", "UCF101", "Acc.", 1, false],
    ["LRS3_TED", "LRS3_TED", "CER", -1, false],
    ["VoxCeleb2", "VoxCeleb2", "EER", -1, false],
    ["IEMOCAP", "IEMOCAP", "Acc.", 1, false],
]