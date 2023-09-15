import { Dispatch, SetStateAction, useState } from "react"
import { Track, TrackCollection } from "../../hooks"

export const Select = ({ track, setTrack, collection, setCollection }: {
    track: Track,
    setTrack: Dispatch<SetStateAction<Track>>,
    collection: TrackCollection[],
    setCollection: Dispatch<SetStateAction<TrackCollection[]>>
}) => {
    const trackValues: Track[] = Object.values(Track);
    const trackCollectionValues: TrackCollection[] = Object.values(TrackCollection);

    const handleClickCollection = (trackKey: TrackCollection) => {
        if (collection.indexOf(trackKey) > -1) {
            setCollection(collection.filter((item) => item !== trackKey));
        } else {
            setCollection([...collection, trackKey]);
        }
    }

    return <div className="items-center flex flex-col">
        <div className="text-base font-bold pb-2 text-blue-400 underline">Tracks</div>
        <div className=" max-w-95 sm:max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl flex flex-row flex-wrap text-base">
            {
                trackValues.map((trackKey, index) => (
                    <div className={`items-center justify-center text-center h-8 ${index === trackValues.length - 1 ? "" : "mr-10"}`} key={index} onClick={() => setTrack(trackKey)}>
                        {/* <div className="relative top-0.5 rounded-full border-2 w-4 h-4 border-black items-center justify-center text-center inline-block mr-2">
                            <div className="absolute h-2 w-2 top-0.5 left-0.5 rounded-full bg-black"></div>
                        </div> */}
                        <div className="inline-block cursor-pointer rounded-full hover:bg-gray-100">
                            <div className="flex relative p-1">
                                <svg className="checkbox-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                                <svg className={`absolute l-1 checkbox-icon-inside transition-colors ${track === trackKey ? "inline-block" : "hidden"}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path></svg>
                            </div>
                        </div>
                        <div className="inline-block relative -top-1.5 pl-1">

                            {trackKey}
                        </div>
                    </div>
                ))
            }
        </div>

        {
            track === Track.MergeData ? <>
                <div className="border-b w-95 sm:w-xl xl:w-5xl lg:w-3xl md:w-2xl pb-4 mb-4" />
                <div className="text-base font-bold pb-2 text-blue-400 underline">Tracks Collection</div>
                <div className=" max-w-95 sm:max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl flex flex-row flex-wrap text-base">
                    {
                        trackCollectionValues.map((trackKey, index) => (
                            <div className={`items-center justify-center text-center h-8 ${index === trackValues.length - 1 ? "" : "mr-10"}`} key={index} onClick={() => handleClickCollection(trackKey)}>
                                <div className="inline-block cursor-pointer rounded-full hover:bg-gray-100">
                                    <div className="flex relative p-1">
                                        <svg className="checkbox-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                                        <svg className={`absolute l-1 checkbox-icon-inside transition-colors ${collection.indexOf(trackKey) > -1 ? "inline-block" : "hidden"}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path></svg>
                                    </div>
                                </div>
                                <div className="inline-block relative -top-1.5 pl-1">

                                    {trackKey}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <div className="border-b w-95 sm:w-xl xl:w-5xl lg:w-3xl md:w-2xl pb-4" /> */}
            </> : <></>
        }
        <div className="h-16"></div>
    </div>
}