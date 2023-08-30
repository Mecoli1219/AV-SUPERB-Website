import { useState, useEffect } from "react";
import { getLeaderboard, LeaderBoardResponse, Submission, Task } from "../../hooks";
import { Table } from "./Table";
import { LEADERBOARD } from "../../constants/leaderboard";
import { set } from "react-hook-form";

const LeaderBoard = () => {
    const [audioOnlyData, setAudioOnlyData] = useState<Submission[]>(LEADERBOARD.AudioOnly);
    const [videoOnly, setVideoOnly] = useState<Submission[]>(LEADERBOARD.VideoOnly);
    const [audioVisualFusion, setAudioVisualFusion] = useState<Submission[]>(LEADERBOARD.AudioVisualFusion);

    useEffect(() => {
        getLeaderboard().then((res) => {
            const data = res.data as LeaderBoardResponse;
            setAudioOnlyData(data.leaderboard.audioOnly);
            setVideoOnly(data.leaderboard.videoOnly);
            setAudioVisualFusion(data.leaderboard.audioVisualFusion);
        })
            .catch((error) => {
                console.error(error);
            });;
    }, []);


    return <div className="space-y-10">
        <Table allData={audioOnlyData} name="Audio-only" />
        <div className="border-y "></div>
        <Table allData={videoOnly} name="Video-only" />
        <div className="border-y "></div>
        <Table allData={audioVisualFusion} name="Audio-visual Fusion" />
    </div>

}


export default LeaderBoard