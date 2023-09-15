import { Dispatch, SetStateAction } from "react";
import { useRouter } from 'next/router';

export const SubmitResult = ({ setShowResult, success, message, success_redirect }: {
    setShowResult: Dispatch<SetStateAction<boolean>>,
    success: boolean,
    message: string,
    success_redirect: string
}) => {
    const router = useRouter();
    const closeResult = (success: boolean) => {
        if (success) {
            if (success_redirect !== "") {
                router.push({
                    pathname: success_redirect,
                });
            }
            setShowResult(false);
        } else {
            setShowResult(false);
        }
    }
    return <div className="absolute">
        <div className="fixed flex top-0 left-0 right-0 w-full h-screen z-50 bg-black bg-opacity-70"
            onClick={() => closeResult(success)}
        >
            <div onClick={(e) => e.stopPropagation()} className={`m-auto px-5 pt-5 pb-3 bg-white dark:bg-gray-800 rounded-lg shadow-md z-60 min-w-1/4`}>
                <div className={`font-bold text-3xl py-2  ${success ? "text-green-500" : "text-red-500"}`}>
                    {success ? "SUCCESS" : "ERROR"}
                </div>
                {
                    (!success) && <div className={`font-normal text-lg py-2 ${success ? "text-green-500" : "text-red-500"}`}>{message} </div>
                }
                <div className="flex flex-row-reverse justify-between items-center mt-5">
                    <button
                        aria-label="Menu"
                        title="Menu"
                        className={`rounded-lg block px-4 py-3 text-white hover:shadow-lg w-full
                        ${success ? "bg-green-400 hover:bg-green-300" : "bg-orange-400 hover:bg-orange-300"}`}
                        onClick={() => closeResult(success)}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
}