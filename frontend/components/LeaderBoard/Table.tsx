import React, { useState, useEffect } from "react";
import { Submission } from "../../hooks";


const KEY_NAME: keyof Submission = "submitName"
const SHOWN_VALUES: [keyof Submission, string, boolean, number][] = [
    ["paramShared", "Params", true, -1],
]
const DATA_VALUES: [keyof Submission, string, string, number][] = [
    ["AS_20K", "AS_20K", "mAP", 1],
    ["VGGSound", "VGGSound", "Acc.", 1],
    ["Kinetics_Sounds", "Kinetics_Sounds", "Acc.", 1],
    ["UCF101", "UCF101", "Acc.", 1],
    ["LRS3_TED", "LRS3_TED", "CER", -1],
    ["VoxCeleb2", "VoxCeleb2", "EER", -1],
    ["IEMOCAP", "IEMOCAP", "Acc.", 1],
]

export const Table = ({ allData, name }: { allData: Submission[], name: string }) => {
    const [sortKey, setSortKey] = useState<[keyof Submission, boolean] | null>(null);
    const [shownData, setShownData] = useState<Submission[]>([]);
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
        return allData;
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


    useEffect(() => {
        setShownData(sortData(allData.filter(displayRules)));
    }, [sortKey, allData]);

    return <>
        <div className="m-auto text-3xl font-bold">{name}</div>
        <div className="relative overflow-x-auto mt-0 shadow-md sm:rounded-lg max-h-90screen text-base">
            <table className="sm:rounded-lg w-full text-sm text-center align-middle text-gray-500 whitespace-nowrap border-separate border-spacing-0 bg-transparent">
                <thead className="text-md text-gray-700 sm:rounded-lg top-0">
                    <tr className="h-12">
                        {

                            <th scope="row"
                                rowSpan={3}
                                className={`px-6 py-auto sticky top-0 bg-gray-100 left-0 border-r border-b hover:bg-gray-200 cursor-pointer z-20
                            ${sortKey && sortKey[0] === "submitName" ? sortKey[1] === true ? "text-green-600" : "text-red-600" : "text-black"}`}
                                onClick={() => changeSortKey("submitName", -1)}>
                                Methods
                            </th>
                        }
                        {
                            SHOWN_VALUES.map(([key, value, sortable, direction]) => {
                                const color = sortKey && sortKey[0] === key ? sortKey[1] === (direction === -1) ? "green" : "red" : "black";
                                const textColor = color === "black" ? "text-black" : `text-${color}-600`
                                return <th scope="row" key={key} rowSpan={3}
                                    className={`sticky top-0 px-6 py-3 bg-gray-100 border-b ${sortable ? "hover:bg-gray-200 cursor-pointer" : ""}`}
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
                            DATA_VALUES.map(([key, value, evalKey, direction]) => {
                                const color = sortKey && sortKey[0] === key ? sortKey[1] === (direction === -1) ? "green" : "red" : "black";
                                const textColor = color === "black" ? "text-black" : `text-${color}-600`
                                return <th scope="row" key={key}
                                    className="px-6 py-3 sticky top-24 bg-gray-100 border-b hover:bg-gray-200 cursor-pointer border-l"
                                    onClick={() => changeSortKey(key, direction)}
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
                            return <tr key={submission[KEY_NAME]} className="bg-transparent border-b">
                                <th scope="col" className="px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50 border-b border-r sticky left-0">
                                    {submission[KEY_NAME]}
                                </th>
                                {
                                    SHOWN_VALUES.map(([key, value, evalKey, upward]) => {
                                        const data = submission[key];
                                        return <td key={key} className="px-6 py-4 border-b">
                                            {typeof data === "number" ? (data > 10000 || data < 0.0001) ? data.toExponential(2) : data.toFixed(2) : data}
                                        </td>
                                    }
                                    )
                                }
                                {
                                    DATA_VALUES.map(([key, value, evalKey, upward]) => {
                                        const data = submission[key];
                                        return <td key={key} className="px-6 py-4 border-b">
                                            {typeof data === "number" ? (data > 10000 || data < 0.0001) ? data.toExponential(2) : data.toFixed(2) : data}
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
    </>
}