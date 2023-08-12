import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession()
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  const items: [string, string][] = [
    ["NEWS", "/news"],
    ["PAPER", "https://arxiv.org/abs/2105.01051"],
    ["CODE", "https://github.com/s3prl/s3prl"],
    ["TASKS", "/tasks"],
    ["RULES", "/rules"],
    ["LEADERBOARD", "/leaderboard"],
    ["SUBMIT", "/submit"],
  ];

  const barHeight: number = 64;

  const handleScroll = () => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;
    // set state based on location info (explained in more detail below)
    setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < barHeight);
    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <>
      {
        openMenu && (
          // full page menu
          <div className="fixed top-0 left-0 right-0 w-full h-screen z-50 bg-black bg-opacity-50"
            onClick={() => setOpenMenu(false)}
          >
            <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-2">
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
              <Link
                href="/"
                onClick={() => {
                  if (session) {
                    signOut()
                  } else {
                    signIn('google')
                  }
                }}
                className="text-base hover:bg-white hover:shadow-lg px-3 py-2 rounded-lg border border-transparent text-gray-600 font-normal block"
              >
                {session ? "LOGOUT" : "LOGIN"}
              </Link>
            </div>
          </div>

        )
      }
      <div className="relative top-0">
        <div className={`transition-top duration-500 shadow-nav ${visible
          ? "bg-white max-w-full mx-auto px-10 md:px-20 py-2 max-h-32 fixed top-0 left-0 right-0"
          : "bg-white max-w-full mx-auto px-10 md:px-20 py-2 max-h-32 fixed -top-32 left-0 right-0"} z-30`}>
          <div className="flex md:flex-row justify-between items-center space-x-10">
            <div className="flex flex-col w-3/5 md:w-1/5 lg:w-2/5">
              <Link href="/" className="hover:bg-white hover:shadow-lg px-2 py-3 rounded-lg border border-transparent">
                <img src="/logo-color.png" className="max-h-12" />
              </Link>
            </div>

            <div className="lg:space-x-4 hidden lg:block">
              {
                items.map((item) => {
                  return <Link
                    href={item[1]}
                    key={item[0]}
                    className={`text-base hover:bg-white hover:shadow-lg px-2 py-3 rounded-lg border border-transparent ${router.asPath === item[1]
                      ? "text-gray-600 font-bold dark:text-gray-400"
                      : "text-gray-400 dark:text-gray-300 font-normal "
                      }`}
                  >
                    {item[0]}
                  </Link>
                })
              }
              <Link
                href="/"
                onClick={() => {
                  if (session) {
                    signOut()
                  } else {
                    signIn('google')
                  }
                }}
                className="text-base hover:bg-white hover:shadow-lg px-2 py-3 rounded-lg border border-transparent text-gray-400 dark:text-gray-300 font-normal"
              >
                {session ? "LOGOUT" : "LOGIN"}
              </Link>
            </div>

            {/* menu button */}
            <div className="flex flex-row-reverse justify-between items-center lg:hidden">
              <button
                aria-label="Menu"
                title="Menu"
                className="dark:text-white block px-4 py-3 hover:bg-white hover:shadow-lg right-0"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-list text-gray-800 dark:text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    className="text-gray-800 dark:text-white"
                    d="M0 3.5A.5.5 0 0 1
                  .5 3h15a.5.5 0 0 1 0 1h-15A.5.5 0 0
                  1 0 3.5zm0 5A.5.5 0 0 1 .5 8h15a.5.5
                  0 0 1 0 1h-15A.5.5 0 0 1 0
                  8.5zm0 5A.5.5 0 0 1 .5 13h15a.5.5
                  0 0 1 0 1h-15A.5.5 0 0 1 0
                  13.5z"
                  />
                </svg>
              </button>


            </div>
          </div>
        </div>

        <div className={`max-w-full mx-auto px-4 py-2 relative ${openMenu ? "top-24" : " top-0"} left-0 right-0 h-24 bg-white `}></div>

      </div>

    </>
  );
}