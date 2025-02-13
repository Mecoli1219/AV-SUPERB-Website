import React, { useState, useEffect } from "react";
import { MergeInfoSubmission, SubmissionInfo, TrackCollection } from "../../hooks";
import { MERGE_KEY_NAME, MERGE_SHOWN_VALUES, MERGE_DATA_VALUES } from "../../constants/profile";
import HoverDescription from "./HoverDescription";



export const MergeTable = ({ audioOnly, videoOnly, audioVisualFusion, collection, setShowOnLeaderboard, downloadPreviousUpload }: {
    audioOnly: SubmissionInfo[],
    videoOnly: SubmissionInfo[],
    audioVisualFusion: SubmissionInfo[],
    collection: TrackCollection[],
    setShowOnLeaderboard: (submission_id: string) => Promise<void>,
    downloadPreviousUpload: (submission_id: string) => Promise<void>
}) => {
    const [sortKey, setSortKey] = useState<[keyof MergeInfoSubmission, boolean] | null>(null);
    const [shownData, setShownData] = useState<MergeInfoSubmission[]>([]);
    const [allData, setAllData] = useState<MergeInfoSubmission[]>([]);
    const displayRules = (data: MergeInfoSubmission) => {
        return true
    }

    const localTimeZoneOffsetMinutes = new Date().getTimezoneOffset();

    const sortData = (data: MergeInfoSubmission[]) => {
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
                } else if (typeof a === typeof b) {
                    res = a.toString().localeCompare(b.toString());
                } else {
                    return 0;
                }
                return sortKey[1] ? res : -res;
            });
        }
        return allData;
    };

    const changeSortKey = (key: keyof MergeInfoSubmission, direction: number) => {
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

    const parseData = (submission: MergeInfoSubmission, key: keyof MergeInfoSubmission) => {
        const data = submission[key];
        if (key === "modelDesc") {
            return <HoverDescription description={data as string} key={key} />
        }
        if (key === "showOnLeaderboard") {
            return <td key={key} className="px-6 py-2 border-b">
                <div className="rounded-full text-lg cursor-pointer py-2" onClick={() => setShowOnLeaderboard(submission["submitUUID"])}>
                    {
                        data === "NO" ? <svg width="20px" height="20px" viewBox="0 0 24 24" className="m-auto" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="4.8">
                                <rect fill="#f9fbff" strokeWidth="1" stroke="#868c8f" x="0.5" y="0.5" width="23" height="23" rx="5.5"></rect>
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <rect fill="#f9fbff" strokeWidth="1" stroke="#868c8f" x="0.5" y="0.5" width="23" height="23" rx="5.5"></rect> </g></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024" className="m-auto" fill="#43A047">
                                <path d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z" />
                            </svg>
                    }
                </div>
            </td>
        }
        return <td key={key} className="px-6 py-4 border-b">
            {typeof data === "number" ? (data > 10000 || data < 0.0001) ? data.toExponential(2) : data.toFixed(2) : data as string}
        </td>
    };

    useEffect(() => {
        // get all submitName
        const submitDict = new Map<string, MergeInfoSubmission>();

        audioOnly.forEach((submission) => {
            if (!submitDict.has(submission.submitUUID)) {
                submitDict.set(submission.submitUUID, {
                    paramShared: submission.paramShared,
                    submitName: submission.submitName,
                    aoeTimeUpload: submission.aoeTimeUpload,
                    showOnLeaderboard: submission.showOnLeaderboard,
                    modelDesc: submission.modelDesc,
                    state: submission.state,
                    stateInfo: submission.stateInfo,
                    submitUUID: submission.submitUUID,
                    [TrackCollection.AudioOnly]: {
                        AS_20K: submission.AS_20K,
                        VGGSound: submission.VGGSound,
                        Kinetics_Sounds: submission.Kinetics_Sounds,
                        UCF101: submission.UCF101,
                        LRS3_TED: submission.LRS3_TED,
                        VoxCeleb2: submission.VoxCeleb2,
                        IEMOCAP: submission.IEMOCAP,
                    },
                    [TrackCollection.VideoOnly]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    },
                    [TrackCollection.AudioVisualFusion]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    }
                });
            } else {
                const data: MergeInfoSubmission = submitDict.get(submission.submitUUID) as MergeInfoSubmission;
                data[TrackCollection.AudioOnly].AS_20K = submission.AS_20K;
                data[TrackCollection.AudioOnly].VGGSound = submission.VGGSound;
                data[TrackCollection.AudioOnly].Kinetics_Sounds = submission.Kinetics_Sounds;
                data[TrackCollection.AudioOnly].UCF101 = submission.UCF101;
                data[TrackCollection.AudioOnly].LRS3_TED = submission.LRS3_TED;
                data[TrackCollection.AudioOnly].VoxCeleb2 = submission.VoxCeleb2;
                data[TrackCollection.AudioOnly].IEMOCAP = submission.IEMOCAP;
            }
        });

        videoOnly.forEach((submission) => {
            if (!submitDict.has(submission.submitUUID)) {
                submitDict.set(submission.submitUUID, {
                    paramShared: submission.paramShared,
                    submitName: submission.submitName,
                    aoeTimeUpload: submission.aoeTimeUpload,
                    showOnLeaderboard: submission.showOnLeaderboard,
                    modelDesc: submission.modelDesc,
                    state: submission.state,
                    submitUUID: submission.submitUUID,
                    stateInfo: submission.stateInfo,
                    [TrackCollection.AudioOnly]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    },
                    [TrackCollection.VideoOnly]: {
                        AS_20K: submission.AS_20K,
                        VGGSound: submission.VGGSound,
                        Kinetics_Sounds: submission.Kinetics_Sounds,
                        UCF101: submission.UCF101,
                        LRS3_TED: submission.LRS3_TED,
                        VoxCeleb2: submission.VoxCeleb2,
                        IEMOCAP: submission.IEMOCAP,
                    },
                    [TrackCollection.AudioVisualFusion]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    }
                });
            } else {
                const data: MergeInfoSubmission = submitDict.get(submission.submitUUID) as MergeInfoSubmission;
                data[TrackCollection.VideoOnly].AS_20K = submission.AS_20K;
                data[TrackCollection.VideoOnly].VGGSound = submission.VGGSound;
                data[TrackCollection.VideoOnly].Kinetics_Sounds = submission.Kinetics_Sounds;
                data[TrackCollection.VideoOnly].UCF101 = submission.UCF101;
                data[TrackCollection.VideoOnly].LRS3_TED = submission.LRS3_TED;
                data[TrackCollection.VideoOnly].VoxCeleb2 = submission.VoxCeleb2;
                data[TrackCollection.VideoOnly].IEMOCAP = submission.IEMOCAP;
            }
        });

        audioVisualFusion.forEach((submission) => {
            if (!submitDict.has(submission.submitUUID)) {
                submitDict.set(submission.submitUUID, {
                    paramShared: submission.paramShared,
                    submitName: submission.submitName,
                    aoeTimeUpload: submission.aoeTimeUpload,
                    showOnLeaderboard: submission.showOnLeaderboard,
                    modelDesc: submission.modelDesc,
                    state: submission.state,
                    stateInfo: submission.stateInfo,
                    submitUUID: submission.submitUUID,
                    [TrackCollection.AudioOnly]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    },
                    [TrackCollection.VideoOnly]: {
                        AS_20K: "-",
                        VGGSound: "-",
                        Kinetics_Sounds: "-",
                        UCF101: "-",
                        LRS3_TED: "-",
                        VoxCeleb2: "-",
                        IEMOCAP: "-",
                    },
                    [TrackCollection.AudioVisualFusion]: {
                        AS_20K: submission.AS_20K,
                        VGGSound: submission.VGGSound,
                        Kinetics_Sounds: submission.Kinetics_Sounds,
                        UCF101: submission.UCF101,
                        LRS3_TED: submission.LRS3_TED,
                        VoxCeleb2: submission.VoxCeleb2,
                        IEMOCAP: submission.IEMOCAP,
                    }
                });
            } else {
                const data: MergeInfoSubmission = submitDict.get(submission.submitUUID) as MergeInfoSubmission;
                data[TrackCollection.AudioVisualFusion].AS_20K = submission.AS_20K;
                data[TrackCollection.AudioVisualFusion].VGGSound = submission.VGGSound;
                data[TrackCollection.AudioVisualFusion].Kinetics_Sounds = submission.Kinetics_Sounds;
                data[TrackCollection.AudioVisualFusion].UCF101 = submission.UCF101;
                data[TrackCollection.AudioVisualFusion].LRS3_TED = submission.LRS3_TED;
                data[TrackCollection.AudioVisualFusion].VoxCeleb2 = submission.VoxCeleb2;
                data[TrackCollection.AudioVisualFusion].IEMOCAP = submission.IEMOCAP;
            }
        });

        console.log(submitDict)
        const data: MergeInfoSubmission[] = [];
        submitDict.forEach((value, key) => {
            data.push(value);
        });

        setAllData(data);
    }, [audioOnly, videoOnly, audioVisualFusion]);
    useEffect(() => {
        setShownData(sortData(allData.filter(displayRules)));
    }, [sortKey, allData]);

    return <>
        <div className="m-auto text-3xl font-bold max-h-10screen pb-2 md:pb-4 md:text-3xl pt-2">{collection.join(' / ')}</div>
        <div className="h-90screen">
            <div className="relative overflow-x-auto mt-0 shadow-md sm:rounded-lg max-h-90screen text-base mb-2">
                <table className="sm:rounded-lg w-full text-sm text-center align-middle text-gray-500 whitespace-nowrap border-separate border-spacing-0 bg-transparent">
                    <thead className="text-md text-gray-700 sm:rounded-lg top-0">
                        <tr className="h-12">
                            {

                                <th scope="row"
                                    rowSpan={3}
                                    className={`px-6 py-auto sticky top-0 bg-gray-100 left-0 border-r border-b hover:bg-gray-200 cursor-pointer z-20
                                        ${sortKey && sortKey[0] === "aoeTimeUpload" ? sortKey[1] === true ? "text-green-600" : "text-red-600" : "text-black"}`}
                                    onClick={() => changeSortKey("aoeTimeUpload", -1)}>
                                    Upload Time
                                </th>
                            }
                            {
                                MERGE_SHOWN_VALUES.map(([key, value, sortable, direction]) => {
                                    const color = sortKey && sortKey[0] === key ? sortKey[1] === (direction === -1) ? "green" : "red" : "black";
                                    const textColor = color === "black" ? "text-black" : `text-${color}-600`
                                    return <th scope="row" key={key} rowSpan={3}
                                        className={`sticky top-0 px-6 py-3 bg-gray-100 border-b border-r ${sortable ? "hover:bg-gray-200 cursor-pointer" : ""}`}
                                        onClick={sortable ? () => changeSortKey(key, direction) : () => { }}
                                    >
                                        <div className={`flex items-center justify-center ${textColor} `} >
                                            {value}
                                            {sortable ?
                                                direction === 1
                                                    ? <svg className="w-5 h-5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                    : direction === -1
                                                        ? <svg className="w-5 h-5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                        : <></>
                                                : <></>
                                            }
                                        </div>
                                    </th>
                                }
                                )
                            }
                            <th scope="row" rowSpan={3}
                                className="sticky top-0 px-6 py-3 bg-gray-100 border-b"
                            >
                                <div className="flex items-center justify-center text-black" >
                                    Download
                                </div>
                            </th>
                            <th scope="row" colSpan={4}
                                className="sticky top-0 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    Audio-Visual
                                </div>
                            </th>
                            <th scope="row" colSpan={3}
                                className="sticky top-0 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    Speech-Visual
                                </div>
                            </th>
                        </tr>
                        <tr className="h-12">
                            <th scope="row" colSpan={2}
                                className="sticky top-12 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    AEC
                                </div>
                            </th>
                            <th scope="row" colSpan={2}
                                className="sticky top-12 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    AR
                                </div>
                            </th>
                            <th scope="row"
                                className="sticky top-12 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    ASR
                                </div>
                            </th>
                            <th scope="row"
                                className="sticky top-12 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    ASV
                                </div>
                            </th>
                            <th scope="row"
                                className="sticky top-12 px-6 py-3 bg-gray-100 border-b border-l"
                            >
                                <div className={`flex items-center justify-center text-black `} >
                                    ER
                                </div>
                            </th>
                        </tr>
                        <tr className="min-h-12">
                            {
                                MERGE_DATA_VALUES.map(([key, value, evalKey, direction, sortable]) => {
                                    const color = sortKey && false ? "red" : "black";
                                    const textColor = color === "black" ? "text-black" : `text-${color}-600`
                                    return <th scope="row" key={key}
                                        className={`px-6 py-3 sticky top-24 bg-gray-100 border-b border-l ${sortable ? "hover:bg-gray-200 cursor-pointer" : ""}`}
                                    >
                                        <div className={`flex items-center justify-center ${textColor}`} >
                                            {value}
                                        </div>
                                        <div className={`${textColor}`}>
                                            {"("}{evalKey}
                                            {
                                                direction === 1
                                                    ? <svg className="w-5 h-5 m-auto inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                    : direction === -1
                                                        ? <svg className="w-5 h-5 m-auto inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                        : <></>
                                            }
                                            {")"}
                                        </div>
                                    </th>
                                }
                                )
                            }
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto max-h-80screen bg-transparent">
                        {
                            shownData.map((submission) => {
                                return <tr key={submission[MERGE_KEY_NAME] as string} className="bg-transparent border-b">
                                    <th scope="col" className="px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50 border-b border-r sticky left-0">
                                        {new Date((submission[MERGE_KEY_NAME] as Date).getTime() + (720 - localTimeZoneOffsetMinutes) * 60 * 1000).toLocaleString()}
                                    </th>
                                    {
                                        MERGE_SHOWN_VALUES.map(([key, value, evalKey, upward]) => parseData(submission, key))
                                    }
                                    <td className="px-6 py-4 border-b cursor-pointer" onClick={() => downloadPreviousUpload(submission["submitUUID"])}>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" className="m-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                <path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </g>
                                        </svg>
                                    </td>
                                    {
                                        MERGE_DATA_VALUES.map(([key, value, evalKey, upward]) => {
                                            const finalResult = collection.map((track) => {
                                                const data = submission[track][key];
                                                return typeof data === "number" ? (data > 10000 || data < 0.0001) ? data.toExponential(2) : data.toFixed(2) : data
                                            })
                                            return <td key={key} className="px-6 py-4 border-b">
                                                <div className="grid grid-flow-col auto-rows-max">

                                                    {
                                                        finalResult.map((data, index) => {
                                                            return <>
                                                                <div key={index} className="text-center w-10">
                                                                    {data}
                                                                </div>
                                                                {
                                                                    index < finalResult.length - 1 ? <div className="text-center px-1">
                                                                        /
                                                                    </div> : <></>
                                                                }
                                                            </>
                                                        })
                                                    }
                                                </div>
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
        </div>
    </>
}