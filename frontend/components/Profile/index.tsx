import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { Table } from "./Table";
import { Select } from "./Select";
import { Track, TrackCollection } from "../../hooks";
import { MergeTable } from "./MergeTable";
import { SubmissionInfoResponse, getSubmission, getSubmissions, getUserInfo, patchSubmission, patchUserInfo, SubmissionInfo } from "../../hooks/profile";
import { SubmitResult } from "../SubmitResult";


const Profile = () => {
    const { data: session, status: sessionStatus } = useSession();
    const token = session?.token as string;
    const [audioOnly, setAudioOnly] = useState<SubmissionInfo[]>([]);
    const [videoOnly, setVideoOnly] = useState<SubmissionInfo[]>([]);
    const [audioVisualFusion, setAudioVisualFusion] = useState<SubmissionInfo[]>([]);
    const [shownData, setShownData] = useState<SubmissionInfo[]>([]);
    const [track, setTrack] = useState<Track>(Track.AudioOnly);
    const [collection, setCollection] = useState<TrackCollection[]>([TrackCollection.AudioOnly]);
    const [username, setUsername] = useState("");
    const [resetUserName, setResetUserName] = useState("");
    const [dailyCounts, setDailyCounts] = useState(0);
    const [weeklyCounts, setWeeklyCounts] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    const getUserName = async () => {
        await getUserInfo(token)
            .then((res) => {
                setUsername(res.data.username);
                setDailyCounts(res.data.daily_counts);
                setWeeklyCounts(res.data.weekly_counts);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleResetUserName = async () => {
        await patchUserInfo(token, resetUserName)
            .then((res) => {
                setUsername(res.data.newUserName);
                setShowResult(true);
                setResetUserName("");
                setMessage("Rename Success!");
                setSuccess(true);
            })
            .catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage(err.message);
                }
                setSuccess(false);
                setShowResult(true);
            });
    };

    const getIndividualSubmission = async () => {
        getSubmissions(token)
            .then((res) => {
                const data = res.data as SubmissionInfoResponse;
                setAudioOnly(data.submission_info.audioOnly);
                setVideoOnly(data.submission_info.videoOnly);
                setAudioVisualFusion(data.submission_info.audioVisualFusion);
                setShownData(track === Track.AudioOnly ? data.submission_info.audioOnly : track === Track.VideoOnly ? data.submission_info.videoOnly : data.submission_info.audioVisualFusion);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const setShowOnLeaderboard = async (submission_id: string) => {
        patchSubmission(submission_id, token)
            .then((res) => {
                setShowResult(true);
                setMessage("Submission Success!");
                setSuccess(true);
                getIndividualSubmission();
            })
            .catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage(err.message);
                }
                setSuccess(false);
                setShowResult(true);
            });
    };

    const downloadPreviousUpload = async (submission_id: string) => {
        getSubmission(submission_id, token)
            .then((data) => {
                let blob = new Blob([data.data], { type: "application.zip" });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = "predict.zip";
                link.click();
            })
            .catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage(err.message);
                }
                setSuccess(false);
                setShowResult(true);
            });
    };

    useEffect(() => {
        getIndividualSubmission();
        getUserName();
    }, []);

    useEffect(() => {
        switch (track) {
            case Track.AudioOnly:
                setShownData(audioOnly);
                break;
            case Track.VideoOnly:
                setShownData(videoOnly);
                break;
            case Track.AudioVisualFusion:
                setShownData(audioVisualFusion);
                break;
        }
    }, [track]);

    return <div className="">
        {
            showResult && <SubmitResult setShowResult={setShowResult} success={success} message={message} success_redirect="" />
        }
        <div className="space-y-4">
            <div className="text-4xl">
                Hello {username}
            </div>
            <div className=" font-light">
                Submissions: <strong>{`${dailyCounts}/day, ${weeklyCounts}/week`}</strong>
            </div>
        </div>
        <div className="border-b w-full pb-4 mb-4" />
        <div className="w-64 m-auto space-x-5 flex flex-row my-12">
            <div className="basis-3/4">
                <div className="relative">
                    <input
                        id="resetName"
                        type="text"
                        className="md-input h-8 outline-none w-full"
                        placeholder=""
                        // extract maxLength from formVal[label].maxLength.value
                        maxLength={20}
                        onChange={(e) => setResetUserName(e.target.value)}
                        value={resetUserName}
                    />
                    <label htmlFor="resetName" className="md-label font-light">Reset your name*</label>
                    <div className="md-input-underline border-t-transparent border-b-gray-400" />
                </div>
            </div>
            <button className="basis-1/4 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:shadow-xl font-light rounded-lg text-sm px-4 py-1 text-center block cursor-pointer"
                onClick={handleResetUserName}>
                RESET
            </button>
        </div>

        <div className="space-y-4">
            <div className="text-4xl">
                Submission History
            </div>
            <div className=" font-light">
                You can check the checkbox to show your submission result(s) on the leaderboard.
            </div>
        </div>
        <div className="border-b w-full pb-4 mb-6" />

        <Select track={track} setTrack={setTrack} collection={collection} setCollection={setCollection} />
        {
            track === Track.MergeData
                ? <MergeTable audioOnly={audioOnly} videoOnly={videoOnly} audioVisualFusion={audioVisualFusion} collection={collection} setShowOnLeaderboard={setShowOnLeaderboard} downloadPreviousUpload={downloadPreviousUpload} />
                : <Table allData={shownData} name={track} setShowOnLeaderboard={setShowOnLeaderboard} downloadPreviousUpload={downloadPreviousUpload} />
        }
    </div>

}


export default Profile