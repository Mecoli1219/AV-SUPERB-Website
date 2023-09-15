import { useState, useEffect, use } from "react";
import { getLeaderboard, LeaderBoardResponse, Submission } from "../../hooks";
import { Table } from "./Table";
import { LEADERBOARD } from "../../constants/leaderboard";
import { Select } from "./Select";
import { Track, TrackCollection } from "../../hooks";
import { MergeTable } from "./MergeTable";


const LeaderBoard = () => {
    const [audioOnly, setAudioOnly] = useState<Submission[]>(LEADERBOARD.AudioOnly);
    const [videoOnly, setVideoOnly] = useState<Submission[]>(LEADERBOARD.VideoOnly);
    const [audioVisualFusion, setAudioVisualFusion] = useState<Submission[]>(LEADERBOARD.AudioVisualFusion);
    const [shownData, setShownData] = useState<Submission[]>(LEADERBOARD.AudioOnly);
    const [track, setTrack] = useState<Track>(Track.AudioOnly);
    const [collection, setCollection] = useState<TrackCollection[]>([TrackCollection.AudioOnly]);

    useEffect(() => {
        getLeaderboard().then((res) => {
            const data = res.data as LeaderBoardResponse;
            setAudioOnly(data.leaderboard.audioOnly);
            setVideoOnly(data.leaderboard.videoOnly);
            setAudioVisualFusion(data.leaderboard.audioVisualFusion);
            setShownData(data.leaderboard.audioOnly);
        })
            .catch((error) => {
                console.error(error);
            });;
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
        <Select track={track} setTrack={setTrack} collection={collection} setCollection={setCollection} />
        {
            track === Track.MergeData
                ? <MergeTable audioOnly={audioOnly} videoOnly={videoOnly} audioVisualFusion={audioVisualFusion} collection={collection} />
                : <Table allData={shownData} name={track} />
        }
    </div>

}


export default LeaderBoard