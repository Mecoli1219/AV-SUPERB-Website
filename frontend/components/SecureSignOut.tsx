import { useState } from "react";
import { signOut } from "next-auth/react"
import Link from "next/link";

export const SecureSignOut = () => {
    const [confirmMenu, setConfirmMenu] = useState(false);
    return <>
        {
            confirmMenu && <div className="absolute">
                <div className="fixed flex top-0 left-0 right-0 w-full h-screen z-50 bg-black bg-opacity-70"
                    onClick={() => setConfirmMenu(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="m-auto px-5 pt-5 pb-3 bg-white dark:bg-gray-800 rounded-lg shadow-md z-60">
                        <div className="text-gray-800 font-bold text-lg py-2">Are you sure you want to logout?</div>
                        <div className="flex flex-row-reverse justify-between items-center">
                            <button
                                aria-label="Menu"
                                title="Menu"
                                className="dark:text-white block px-4 py-3 hover:bg-white hover:shadow-lg right-0"
                                onClick={() => signOut()}
                            >
                                Yes
                            </button>
                            <button
                                aria-label="Menu"
                                title="Menu"
                                className="dark:text-white block px-4 py-3 hover:bg-white hover:shadow-lg right-0"
                                onClick={() => setConfirmMenu(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }

        <button
            onClick={() => setConfirmMenu(true)}
            className="text-base lg:text-sm hover:bg-white hover:shadow-lg px-3 py-2 lg:px-2 lg:py-3 rounded-lg border border-transparent text-gray-600 lg:text-gray-400 font-normal lg:font-light max-lg:block"
        >
            LOGOUT
        </button>
    </>
}