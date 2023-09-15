import { AxiosResponse } from "axios";
import axios from "./instance";
import { MergeData, TrackCollection } from ".";

export type MergeInfoSubmission = {
    paramShared: number;
    submitName: string;
    showOnLeaderboard: string;
    aoeTimeUpload: Date;
    modelDesc: string;
    state: string;
    stateInfo: string;
    submitUUID: string;
} & {
        [key in TrackCollection]: MergeData;
    }

export interface SubmissionInfo {
    paramShared: number;
    submitName: string;
    AS_20K: number;
    VGGSound: number;
    Kinetics_Sounds: number;
    UCF101: number;
    LRS3_TED: number;
    VoxCeleb2: number;
    IEMOCAP: number;
    aoeTimeUpload: Date;
    showOnLeaderboard: string;
    modelDesc: string;
    state: string;
    stateInfo: string;
    submitUUID: string;
}

export type SubmissionInfoResponse = {
    submission_info: {
        audioOnly: SubmissionInfo[];
        videoOnly: SubmissionInfo[];
        audioVisualFusion: SubmissionInfo[];
    }
}

export const getUserInfo = async (token: string) => await
    axios.get("/api/user/info", { headers: { 'Authorization': 'Bearer ' + token } });

export const patchUserInfo = async (token: string, resetUserName: string) => await
    axios.patch("/api/user/info", { name: resetUserName }, { headers: { 'Authorization': 'Bearer ' + token } });

export const getSubmissions = async (token: string): Promise<AxiosResponse<SubmissionInfoResponse>> => await
    axios.get("/api/submissions", { headers: { 'Authorization': 'Bearer ' + token } })
        .then((res) => {
            // Update the submission info to include the date object
            const data = res.data as SubmissionInfoResponse;
            data.submission_info.audioOnly.forEach((submission) => {
                console.log(submission.aoeTimeUpload);
                submission.aoeTimeUpload = new Date(submission.aoeTimeUpload);
            });
            data.submission_info.videoOnly.forEach((submission) => {
                submission.aoeTimeUpload = new Date(submission.aoeTimeUpload);
            });
            data.submission_info.audioVisualFusion.forEach((submission) => {
                submission.aoeTimeUpload = new Date(submission.aoeTimeUpload);
            });
            return res;
        });

export const patchSubmission = async (submission_id: string, token: string) => await
    axios.patch("/api/submission/" + submission_id, {}, { headers: { 'Authorization': 'Bearer ' + token } });

export const getSubmission = async (submission_id: string, token: string) => await
    axios.get("/api/submission/" + submission_id, { headers: { 'Authorization': 'Bearer ' + token }, responseType: "blob" });
