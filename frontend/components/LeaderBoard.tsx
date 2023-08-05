import axios from "axios"
import { useState, useEffect } from "react";
import getConfig from 'next/config'

enum Task {
    CONSTRAINED = "CONSTRAINED",
    UNCONSTRAINED = "UNCONSTRAINED",
    LESS_CONSTRAINED = "LESS_CONSTRAINED",
}

interface Submission {
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

type LeaderBoardResponse = {
    leaderboard: Submission[];
}

const LEADERBOARD: Submission[] = [
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "FBANK",
        "modelDesc": "classic feature",
        "stride": 10,
        "inputFormat": "waveform",
        "macsShort": 44770560,
        "macsMedium": 77600880,
        "macsLong": 123311280,
        "macsLonger": 233443440,
        "macs": 479126160,
        "paramShared": 0,
        "fineTunedParam": "-",
        "taskSpecParam": "-",
        "PR_per_public": 82.01,
        "KS_acc_public": 41.3826674,
        "IC_acc_public": 9.649354219,
        "SID_acc_public": 20.058174,
        "ER_acc_public": 48.23672168,
        "ERfold1_acc_public": "-",
        "ERfold2_acc_public": "-",
        "ERfold3_acc_public": "-",
        "ERfold4_acc_public": "-",
        "ERfold5_acc_public": "-",
        "ASR_wer_public": 23.18,
        "ASR_LM_wer_public": 15.21,
        "QbE_mtwv_public": 0.58,
        "SF_f1_public": 69.64,
        "SF_cer_public": 52.94,
        "SV_eer_public": 9.56,
        "SD_der_public": 10.05,
        "ST_bleu_public": 2.32,
        "SE_pesq_public": 2.55,
        "SE_stoi_public": 93.6,
        "SS_sisdri_public": 9.2341
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "PASE+",
        "modelDesc": "multi-task",
        "stride": 10,
        "inputFormat": "waveform",
        "corpus": "LS 50 hr",
        "macsShort": 46483604480,
        "macsMedium": 80363837440,
        "macsLong": 127464278016,
        "macsLonger": 241113742336,
        "macs": 495425462272,
        "paramShared": 7832896,
        "PR_per_public": 58.87,
        "KS_acc_public": 82.54,
        "IC_acc_public": 29.82,
        "SID_acc_public": 37.99,
        "ER_acc_public": 57.86,
        "ERfold1_acc_public": 58.341014,
        "ERfold2_acc_public": 58.4555208,
        "ERfold3_acc_public": 57.34144,
        "ERfold4_acc_public": 57.22599626,
        "ERfold5_acc_public": 57.9371452,
        "ASR_wer_public": 25.11,
        "ASR_LM_wer_public": 16.62,
        "QbE_mtwv_public": 0.72,
        "SF_f1_public": 62.14,
        "SF_cer_public": 60.17,
        "SV_eer_public": 11.61,
        "SD_der_public": 8.68,
        "ST_bleu_public": 3.16,
        "SE_pesq_public": 2.56,
        "SE_stoi_public": 93.9,
        "SS_sisdri_public": 9.87
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "APC",
        "modelDesc": "F-G",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 360 hr",
        "macsShort": 17036154112,
        "macsMedium": 31368788304,
        "macsLong": 49530314000,
        "macsLonger": 88739387472,
        "macs": 501705362352,
        "paramShared": 4105296,
        "PR_per_public": 41.98,
        "KS_acc_public": 91.01,
        "IC_acc_public": 74.69,
        "SID_acc_public": 60.42,
        "ER_acc_public": 59.33,
        "ERfold1_acc_public": 60.83,
        "ERfold2_acc_public": 59.53,
        "ERfold3_acc_public": 58.64,
        "ERfold4_acc_public": 58.97,
        "ERfold5_acc_public": 58.66,
        "ASR_wer_public": 21.28,
        "ASR_LM_wer_public": 14.74,
        "QbE_mtwv_public": 3.1,
        "SF_f1_public": 70.46,
        "SF_cer_public": 50.89,
        "SV_eer_public": 8.56,
        "SD_der_public": 10.53,
        "ST_bleu_public": 5.95,
        "SE_pesq_public": 2.5567,
        "SE_stoi_public": 93.4,
        "SS_sisdri_public": 8.92
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "VQ-APC",
        "modelDesc": "F-G + VQ",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 360 hr",
        "macsShort": 18135061760,
        "macsMedium": 33273526608,
        "macsLong": 52557028624,
        "macsLonger": 94469331024,
        "macs": 513465666480,
        "paramShared": 4630096,
        "PR_per_public": 41.08,
        "KS_acc_public": 91.11,
        "IC_acc_public": 74.48,
        "SID_acc_public": 60.15,
        "ER_acc_public": 59.66,
        "ERfold1_acc_public": 61.84,
        "ERfold2_acc_public": 56.99,
        "ERfold3_acc_public": 58.47,
        "ERfold4_acc_public": 59.75,
        "ERfold5_acc_public": 61.24,
        "ASR_wer_public": 21.2,
        "ASR_LM_wer_public": 15.21,
        "QbE_mtwv_public": 2.51,
        "SF_f1_public": 68.53,
        "SF_cer_public": 52.91,
        "SV_eer_public": 8.72,
        "SD_der_public": 10.45,
        "ST_bleu_public": 4.23,
        "SE_pesq_public": 2.56,
        "SE_stoi_public": 93.4,
        "SS_sisdri_public": 8.44
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "NPC",
        "modelDesc": "M-G + VQ",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 360 hr",
        "macsShort": 40633995008,
        "macsMedium": 70430965584,
        "macsLong": 111917964304,
        "macsLonger": 211874490192,
        "macs": 434857415088,
        "paramShared": 19380560,
        "PR_per_public": 43.81,
        "KS_acc_public": 88.96,
        "IC_acc_public": 69.44,
        "SID_acc_public": 55.92,
        "ER_acc_public": 59.08,
        "ERfold1_acc_public": 59.54,
        "ERfold2_acc_public": 59.63,
        "ERfold3_acc_public": 58.73,
        "ERfold4_acc_public": 59.65,
        "ERfold5_acc_public": 57.86,
        "ASR_wer_public": 20.2,
        "ASR_LM_wer_public": 13.91,
        "QbE_mtwv_public": 2.46,
        "SF_f1_public": 72.79,
        "SF_cer_public": 48.44,
        "SV_eer_public": 9.4,
        "SD_der_public": 9.34,
        "ST_bleu_public": 4.32,
        "SE_pesq_public": 2.5211,
        "SE_stoi_public": 93.1,
        "SS_sisdri_public": 8.04
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "Mockingjay",
        "modelDesc": "time M-G",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 360 hr",
        "macsShort": 190877993792,
        "macsMedium": 336752086752,
        "macsLong": 531747049056,
        "macsLonger": 1017039586576,
        "macs": 2076416716176,
        "paramShared": 85118208,
        "PR_per_public": 70.19,
        "KS_acc_public": 83.67,
        "IC_acc_public": 34.33,
        "SID_acc_public": 32.29,
        "ER_acc_public": 50.28,
        "ERfold1_acc_public": 49.95,
        "ERfold2_acc_public": 48.97,
        "ERfold3_acc_public": 49.87,
        "ERfold4_acc_public": 52.96,
        "ERfold5_acc_public": 49.64,
        "ASR_wer_public": 22.82,
        "ASR_LM_wer_public": 15.48,
        "QbE_mtwv_public": 0.066,
        "SF_f1_public": 61.59,
        "SF_cer_public": 58.89,
        "SV_eer_public": 11.66,
        "SD_der_public": 10.54,
        "ST_bleu_public": 4.45,
        "SE_pesq_public": 2.5305,
        "SE_stoi_public": 93.4,
        "SS_sisdri_public": 9.29
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "TERA",
        "modelDesc": "time/freq M-G",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 960 hr",
        "macsShort": 47885993792,
        "macsMedium": 85785651936,
        "macsLong": 143234311776,
        "macsLonger": 290801511184,
        "macs": 567707468688,
        "paramShared": 21327360,
        "PR_per_public": 49.17,
        "KS_acc_public": 89.48,
        "IC_acc_public": 58.42,
        "SID_acc_public": 57.57,
        "ER_acc_public": 56.27,
        "ERfold1_acc_public": 56.31,
        "ERfold2_acc_public": 57.77,
        "ERfold3_acc_public": 54.39,
        "ERfold4_acc_public": 56.55,
        "ERfold5_acc_public": 56.33,
        "ASR_wer_public": 18.17,
        "ASR_LM_wer_public": 12.16,
        "QbE_mtwv_public": 0.13,
        "SF_f1_public": 67.5,
        "SF_cer_public": 54.17,
        "SV_eer_public": 15.89,
        "SD_der_public": 9.96,
        "ST_bleu_public": 5.24,
        "SE_pesq_public": 2.5422,
        "SE_stoi_public": 93.6,
        "SS_sisdri_public": 10.19
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "modified CPC",
        "modelDesc": "F-C",
        "stride": 10,
        "inputFormat": "waveform",
        "corpus": "LL 60k hr",
        "macsShort": 15102844928,
        "macsMedium": 26348280064,
        "macsLong": 41749438976,
        "macsLonger": 78319203584,
        "macs": 202557865984,
        "paramShared": 1843456,
        "PR_per_public": 42.54,
        "KS_acc_public": 91.88,
        "IC_acc_public": 64.09,
        "SID_acc_public": 39.63,
        "ER_acc_public": 60.96,
        "ERfold1_acc_public": 58.16,
        "ERfold2_acc_public": 62.76,
        "ERfold3_acc_public": 58.12,
        "ERfold4_acc_public": 64.99,
        "ERfold5_acc_public": 60.76,
        "ASR_wer_public": 20.18,
        "ASR_LM_wer_public": 13.53,
        "QbE_mtwv_public": 3.26,
        "SF_f1_public": 71.19,
        "SF_cer_public": 49.91,
        "SV_eer_public": 12.86,
        "SD_der_public": 10.38,
        "ST_bleu_public": 4.82,
        "SE_pesq_public": 2.57,
        "SE_stoi_public": 93.7,
        "SS_sisdri_public": 10.4
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "wav2vec",
        "modelDesc": "F-C",
        "stride": 10,
        "inputFormat": "waveform",
        "corpus": "LS 960 hr",
        "macsShort": 101600354304,
        "macsMedium": 176025378816,
        "macsLong": 279450689536,
        "macsLonger": 529102856192,
        "macs": 1086179278848,
        "paramShared": 32537088,
        "PR_per_public": 31.58,
        "KS_acc_public": 95.59,
        "IC_acc_public": 84.92,
        "SID_acc_public": 56.56,
        "ER_acc_public": 59.79,
        "ERfold1_acc_public": 59.86,
        "ERfold2_acc_public": 63.25,
        "ERfold3_acc_public": 54.47,
        "ERfold4_acc_public": 59.55,
        "ERfold5_acc_public": 61.88,
        "ASR_wer_public": 15.86,
        "ASR_LM_wer_public": 11.0,
        "QbE_mtwv_public": 4.85,
        "SF_f1_public": 76.37,
        "SF_cer_public": 43.71,
        "SV_eer_public": 7.99,
        "SD_der_public": 9.9,
        "ST_bleu_public": 6.61,
        "SE_pesq_public": 2.53,
        "SE_stoi_public": 93.8,
        "SS_sisdri_public": 9.3
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "vq-wav2vec",
        "modelDesc": "F-C + VQ",
        "stride": 10,
        "inputFormat": "waveform",
        "corpus": "LS 960 hr",
        "macsShort": 104616583168,
        "macsMedium": 181259083776,
        "macsLong": 287764062208,
        "macsLonger": 544854433792,
        "macs": 1118494162944,
        "paramShared": 34145408,
        "PR_per_public": 33.48,
        "KS_acc_public": 93.38,
        "IC_acc_public": 85.68,
        "SID_acc_public": 38.8,
        "ER_acc_public": 58.24,
        "ERfold1_acc_public": 60.28,
        "ERfold2_acc_public": 59.14,
        "ERfold3_acc_public": 56.13,
        "ERfold4_acc_public": 58.58,
        "ERfold5_acc_public": 57.05,
        "ASR_wer_public": 17.71,
        "ASR_LM_wer_public": 12.8,
        "QbE_mtwv_public": 4.1,
        "SF_f1_public": 77.68,
        "SF_cer_public": 41.54,
        "SV_eer_public": 10.38,
        "SD_der_public": 9.93,
        "ST_bleu_public": 5.66,
        "SE_pesq_public": 2.48,
        "SE_stoi_public": 93.6,
        "SS_sisdri_public": 8.16
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "wav2vec 2.0 Base",
        "modelDesc": "M-C + VQ",
        "stride": 20,
        "inputFormat": "waveform",
        "corpus": "LS 960 hr",
        "macsShort": 149255103040,
        "macsMedium": 261280279552,
        "macsLong": 422366359296,
        "macsLonger": 836254280960,
        "macs": 1669156022848,
        "paramShared": 95044608,
        "PR_per_public": 5.74,
        "KS_acc_public": 96.23,
        "IC_acc_public": 92.35,
        "SID_acc_public": 75.18,
        "ER_acc_public": 63.43,
        "ERfold1_acc_public": 62.857145,
        "ERfold2_acc_public": 68.621701,
        "ERfold3_acc_public": 60.9904408,
        "ERfold4_acc_public": 63.530552,
        "ERfold5_acc_public": 61.1603558,
        "ASR_wer_public": 6.43,
        "ASR_LM_wer_public": 4.79,
        "QbE_mtwv_public": 2.33,
        "SF_f1_public": 88.3,
        "SF_cer_public": 24.77,
        "SV_eer_public": 6.02,
        "SD_der_public": 6.08,
        "ST_bleu_public": 14.81,
        "SE_pesq_public": 2.55,
        "SE_stoi_public": 93.9,
        "SS_sisdri_public": 9.77
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "wav2vec 2.0 Large",
        "modelDesc": "M-C + VQ",
        "stride": 20,
        "inputFormat": "waveform",
        "corpus": "LL 60k hr",
        "macsShort": 386109040128,
        "macsMedium": 676240179200,
        "macsLong": 1094078121984,
        "macsLonger": 2169279633408,
        "macs": 4325706974720,
        "paramShared": 317390592,
        "PR_per_public": 4.75,
        "KS_acc_public": 96.66,
        "IC_acc_public": 95.28,
        "SID_acc_public": 86.14,
        "ER_acc_public": 65.64,
        "ERfold1_acc_public": 65.253454,
        "ERfold2_acc_public": 64.516127,
        "ERfold3_acc_public": 65.5951321,
        "ERfold4_acc_public": 66.53734445,
        "ERfold5_acc_public": 66.317486,
        "ASR_wer_public": 3.75,
        "ASR_LM_wer_public": 3.1,
        "QbE_mtwv_public": 4.89,
        "SF_f1_public": 87.11,
        "SF_cer_public": 27.31,
        "SV_eer_public": 5.65,
        "SD_der_public": 5.62,
        "ST_bleu_public": 14.07,
        "SE_pesq_public": 2.52,
        "SE_stoi_public": 94,
        "SS_sisdri_public": 10.02
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "HuBERT Base",
        "modelDesc": "M-P + VQ",
        "stride": 20,
        "inputFormat": "waveform",
        "corpus": "LS 960 hr",
        "macsShort": 149255103040,
        "macsMedium": 261280279552,
        "macsLong": 422366359296,
        "macsLonger": 836254280960,
        "macs": 1669156022848,
        "paramShared": 94697600,
        "PR_per_public": 5.41,
        "KS_acc_public": 96.3,
        "IC_acc_public": 98.34,
        "SID_acc_public": 81.42,
        "ER_acc_public": 64.92,
        "ERfold1_acc_public": 62.39631,
        "ERfold2_acc_public": 66.568917,
        "ERfold3_acc_public": 65.24761,
        "ERfold4_acc_public": 65.179437,
        "ERfold5_acc_public": 65.18936,
        "ASR_wer_public": 6.42,
        "ASR_LM_wer_public": 4.79,
        "QbE_mtwv_public": 7.36,
        "SF_f1_public": 88.53,
        "SF_cer_public": 25.2,
        "SV_eer_public": 5.11,
        "SD_der_public": 5.88,
        "ST_bleu_public": 15.53,
        "SE_pesq_public": 2.58,
        "SE_stoi_public": 93.9,
        "SS_sisdri_public": 9.36
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "HuBERT Large",
        "modelDesc": "M-P + VQ",
        "stride": 20,
        "inputFormat": "waveform",
        "corpus": "LL 60k hr",
        "macsShort": 386052797568,
        "macsMedium": 676078942208,
        "macsLong": 1093669977600,
        "macsLonger": 2167758912000,
        "macs": 4323560629376,
        "paramShared": 316609408,
        "PR_per_public": 3.53,
        "KS_acc_public": 95.29,
        "IC_acc_public": 98.76,
        "SID_acc_public": 90.33,
        "ER_acc_public": 67.62,
        "ERfold1_acc_public": 67.18894,
        "ERfold2_acc_public": 69.30596,
        "ERfold3_acc_public": 67.85404,
        "ERfold4_acc_public": 67.022305,
        "ERfold5_acc_public": 66.72038436,
        "ASR_wer_public": 3.62,
        "ASR_LM_wer_public": 2.94,
        "QbE_mtwv_public": 3.53,
        "SF_f1_public": 89.81,
        "SF_cer_public": 21.76,
        "SV_eer_public": 5.98,
        "SD_der_public": 5.75,
        "ST_bleu_public": 20.01,
        "SE_pesq_public": 2.64,
        "SE_stoi_public": 94.2,
        "SS_sisdri_public": 10.45
    },
    {
        "name": "paper",
        "aoeTimeUpload": "Interspeech2021",
        "task": Task.CONSTRAINED,
        "submitName": "DeCoAR 2.0",
        "modelDesc": "M-G + VQ",
        "stride": 10,
        "inputFormat": "FBANK",
        "corpus": "LS 960 hr",
        "macsShort": 97193730368,
        "macsMedium": 171261995856,
        "macsLong": 279562070800,
        "macsLonger": 566120141904,
        "macs": 1114137938928,
        "paramShared": 89837696,
        "PR_per_public": 14.93,
        "KS_acc_public": 94.48,
        "IC_acc_public": 90.8,
        "SID_acc_public": 74.42,
        "ER_acc_public": 62.47,
        "ERfold1_acc_public": 60.73732,
        "ERfold2_acc_public": 66.6666686,
        "ERfold3_acc_public": 62.55429,
        "ERfold4_acc_public": 62.4636292,
        "ERfold5_acc_public": 59.951651,
        "ASR_wer_public": 13.02,
        "ASR_LM_wer_public": 9.07,
        "QbE_mtwv_public": 4.06,
        "SF_f1_public": 83.28,
        "SF_cer_public": 34.73,
        "SV_eer_public": 7.16,
        "SD_der_public": 6.59,
        "ST_bleu_public": 9.94,
        "SE_pesq_public": 2.47,
        "SE_stoi_public": 93.2,
        "SS_sisdri_public": 8.54
    }
]
const KEY_NAME: keyof Submission = "submitName"
const SHOWN_VALUES: [keyof Submission, string, boolean, number][] = [
    ["name", "Name", false, 0],
    ["modelDesc", "Description", false, 0],
    ["paramShared", "Params", true, -1],
    ["macs", "MACs", true, -1],
    ["macsShort", "(1)", true, -1],
    ["macsMedium", "(2)", true, -1],
    ["macsLong", "(3)", true, -1],
    ["macsLonger", "(4)", true, -1],
    ["PR_per_public", "PR", true, -1],
    ["ASR_wer_public", "ASR", true, -1],
    ["KS_acc_public", "KS", true, -1],
    ["IC_acc_public", "IC", true, -1],
    ["SID_acc_public", "SID", true, -1],
    ["ER_acc_public", "ER", true, 1],
]

const { publicRuntimeConfig } = getConfig();
const BACKEND_URL = publicRuntimeConfig.BACKEND_URL;

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState<Submission[]>(LEADERBOARD);
    const [leaderboardShownData, setLeaderboardShownData] = useState<Submission[]>([]);
    const [sortKey, setSortKey] = useState<[keyof Submission, boolean] | null>(null);

    const displayRules = (data: Submission) => {
        return true
    }

    const sortData = (data: Submission[]) => {
        if (sortKey) {
            return data.sort((data_a, data_b) => {
                const a = data_a[sortKey[0]];
                const b = data_b[sortKey[0]];
                let res;
                const isNumericString = (value: string) => /^-?\d+(\.\d+)?$/.test(value);

                if (a === undefined && b === undefined) {
                    res = 0;
                } else if (a === undefined) {
                    res = -1;
                } else if (b === undefined) {
                    res = 1;
                } else if (typeof a === 'string' && typeof b === 'string') {
                    if (isNumericString(a) && isNumericString(b)) {
                        const numA = parseFloat(a);
                        const numB = parseFloat(b);
                        res = numA - numB;
                    } else {
                        res = a.localeCompare(b);
                    }
                } else if (typeof a === 'string' && isNumericString(a) && typeof b === 'number') {
                    const numA = parseFloat(a);
                    res = numA - b;
                } else if (typeof a === 'number' && typeof b === 'string' && isNumericString(b)) {
                    const numB = parseFloat(b);
                    res = a - numB;
                } else if (typeof a === 'number' && typeof b === 'number') {
                    res = a - b;
                } else {
                    return 0;
                }
                return sortKey[1] ? res : -res;
            });
        }
        return leaderboardData;
    };

    const changeSortKey = (key: keyof Submission, direction: number) => {
        const initialDirection = direction === -1;
        if (sortKey) {
            if (sortKey[0] === key) {
                if (sortKey[1] === initialDirection) {
                    setSortKey([key, !initialDirection]);
                } else {
                    setSortKey(null);
                }
            } else {
                setSortKey([key, initialDirection]);
            }
        } else {
            setSortKey([key, initialDirection]);
        }
    };

    // const all_not_nan = (submission: Submission) => {
    //     for (let accessor of hidden_dev_set) {
    //         if (!is_number_and_not_nan(submission[accessor])) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
    const getLeaderboard = async () => {
        await axios
            .get(`${BACKEND_URL}/api/submission/leaderboard`)
            .then((res) => {
                const data = res.data as LeaderBoardResponse;
                setLeaderboardData(data.leaderboard);
                setLeaderboardShownData(data.leaderboard.filter(displayRules));
            })
            .catch((error) => {
                console.error(error);
            });

        // await axios({
        //     method: "get",
        //     url: `${BACKEND_URL}/api/hiddensubmission/leaderboard`,
        // })
        //     .then((res) => {
        //         const data = res.data as LeaderBoardResponse;
        //         let leaderboardData = data.leaderboard;

        //         leaderboardData = leaderboardData.filter(all_not_nan);

        //         if (leaderboardData.length > 0) {
        //             let newShownData = []
        //             let names = new Set(leaderboardData.map(data => data.name));
        //             for (let name of names) {
        //                 let submissions = leaderboardData.filter(data => data.name === name);

        //                 if (submissions.length < 1) {
        //                     continue;
        //                 }
        //                 if (name.includes("baseline")) {
        //                     newShownData.push(...submissions);
        //                     continue;
        //                 }

        //                 let userEmail = auth.email;
        //                 for (let submission of submissions) {
        //                     if (submission.email != userEmail) {
        //                         submission.name = "-";
        //                         submission.submitName = "-";
        //                         submission.modelDesc = "-";
        //                     }
        //                 }

        //                 let selected = submissions.reduce((a, b) => (a.showOnLeaderboard === "YES") || (b.showOnLeaderboard === "YES"), {
        //                     showOnLeaderboard: false,
        //                 })
        //                 if (selected) {
        //                     newShownData.push(...submissions.filter(data => data.showOnLeaderboard));
        //                 }
        //                 else {
        //                     newShownData.push(...submissions);
        //                 }
        //             }
        //             setLeaderboardHiddenData(newShownData);
        //             setLeaderboardHiddenShownData(newShownData);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    useEffect(() => {
        getLeaderboard();
    }, []);

    useEffect(() => {
        setLeaderboardShownData(sortData(leaderboardData.filter(displayRules)));
    }, [sortKey, leaderboardData]);

    return <div className="relative overflow-x-auto mt-0 shadow-md sm:rounded-lg max-h-80screen">
        <table className="sm:rounded-lg w-full text-sm text-center align-middle text-gray-500 whitespace-nowrap border-separate border-spacing-0">
            <thead className=" text-md text-gray-700 sm:rounded-lg ">
                <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-100 sticky top-0 left-0 z-20 border-r border-b hover:bg-gray-200 cursor-pointer"
                        onClick={() => changeSortKey("submitName", -1)}>
                        Methods
                    </th>
                    {
                        SHOWN_VALUES.map(([key, value, sortable, direction]) => {
                            const color = sortKey && sortKey[0] === key ? sortKey[1] === (direction === -1) ? "green" : "red" : "black";
                            const textColor = color === "black" ? "text-black" : `text-${color}-600`
                            return <th scope="col" key={key}
                                className={`px-6 py-3 sticky bg-gray-100 border-b top-0 ${sortable ? "hover:bg-gray-200 cursor-pointer" : ""}`}
                                onClick={sortable ? () => changeSortKey(key, direction) : () => { }}
                            >
                                <div className={`flex items-center justify-center ${textColor} `} >
                                    {value}
                                    {sortable ?
                                        direction === 1
                                            ? <svg className="w-5 h-5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                            : direction === -1
                                                ? <svg className="w-5 h-5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                : <></>
                                        : <></>
                                    }
                                </div>
                            </th>
                        }
                        )
                    }
                </tr>
            </thead>
            <tbody className=" overflow-y-auto h-80screen">
                {
                    leaderboardShownData.map((submission) => {
                        return <tr key={submission[KEY_NAME]} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50 border-b border-r sticky left-0">
                                {submission[KEY_NAME]}
                            </th>
                            {
                                SHOWN_VALUES.map(([key, value, sortable]) => {
                                    const data = submission[key];
                                    return <td key={key} className="px-6 py-4 border-b">
                                        {typeof data === "number" ? data > 10000 ? data.toExponential(2) : data.toFixed(2) : data}
                                    </td>
                                }
                                )
                            }
                        </tr>
                    }
                    )
                }
            </tbody>
        </table>

    </div>

}


export default LeaderBoard