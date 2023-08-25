import { AxiosResponse } from "axios";
import axios from "./instance";

export enum Task {
    CONSTRAINED = "CONSTRAINED",
    UNCONSTRAINED = "UNCONSTRAINED",
    LESS_CONSTRAINED = "LESS_CONSTRAINED",
}
export interface Submission {
    name: string;
    aoeTimeUpload: string;
    task: Task;
    submitName: string;
    modelDesc: string;
    stride: number;
    inputFormat: string;
    fineTunedParam?: string,
    taskSpecParam?: string,
    corpus?: string;
    macsShort: number;
    macsMedium: number;
    macsLong: number;
    macsLonger: number;
    macs: number;
    paramShared: number;
    PR_per_public: number;
    KS_acc_public: number;
    IC_acc_public: number;
    SID_acc_public: number;
    ER_acc_public: number;
    ERfold1_acc_public: string | number;
    ERfold2_acc_public: string | number;
    ERfold3_acc_public: string | number;
    ERfold4_acc_public: string | number;
    ERfold5_acc_public: string | number;
    ASR_wer_public: number;
    ASR_LM_wer_public: number;
    QbE_mtwv_public: number;
    SF_f1_public: number;
    SF_cer_public: number;
    SV_eer_public: number;
    SD_der_public: number;
    ST_bleu_public: number;
    SE_pesq_public: number;
    SE_stoi_public: number;
    SS_sisdri_public: number;
}
export type LeaderBoardResponse = {
    leaderboard: Submission[];
}
export const getLeaderboard = async (): Promise<AxiosResponse<LeaderBoardResponse>> => await axios
    .get("/api/submission/leaderboard")
