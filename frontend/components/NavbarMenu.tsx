import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { SecureSignOut } from "./SecureSignOut";

interface NavbarMenuProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    items: [string, string][];
}

// react new class
export const NavbarMenu = ({ setOpenMenu, items }: NavbarMenuProps) => {
    const router = useRouter();
    const { data: session } = useSession()

    return <div className="fixed top-0 left-0 right-0 w-full h-screen z-30 bg-black bg-opacity-50"
        onClick={() => setOpenMenu(false)}
    >
        <div onClick={(e) => e.stopPropagation()} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-2 z-40">
            {
                items.map((item, index) => {
                    return <Link
                        href={item[1]}
                        className={`text-base hover:bg-white hover:shadow-lg px-3 py-2 rounded-lg border border-transparent ${router.asPath === item[1]
                            ? "block text-gray-800 font-bold"
                            : "block text-gray-600 font-normal "
                            }`}
                        key={index}
                    >
                        {item[0]}
                    </Link>
                })
            }
            {
                session ? <SecureSignOut /> : <Link
                    href="/"
                    onClick={() => signIn('google')}
                    className="text-base hover:bg-white hover:shadow-lg px-3 py-2 lg:px-2 lg:py-3 rounded-lg border border-transparent text-gray-600 lg:text-gray-400 font-normal max-lg:block"
                >
                    LOGIN
                </Link>
            }
        </div>
    </div>
}
