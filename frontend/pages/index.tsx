import React, { useState } from "react";
import Link from "next/link";

function Home() {

  const [width, setWidth] = useState(0);

  const CONTRIBUTORS: [string, string][] = [
    ["ntu-1000.png", "https://www.ntu.edu.tw/english/"],
    ["cmu-1000.png", "https://www.cmu.edu/"],
    ["mit-1000.png", "https://www.mit.edu/"],
    ["jhu-1000.png", "https://www.jhu.edu/"],
    ["fair-1000.png", "https://ai.facebook.com/"],
    ["lxt-1000.png", "https://www.lxt.ai/"],
    ["huggingface-1000.png", "https://huggingface.co/"],
    ["isca_logo_1000.png", "https://www.isca-speech.org/iscaweb/"],
    ["tws-1000.png", "https://tws.twcc.ai/"]
  ]

  const videoWidth = Math.min(width, 700)
  const opts = {
    height: videoWidth / 1920 * 1080,
    width: videoWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <>
      <section className="bg-white justify-center align-middle text-center flex flex-row items-center">
        <div className="mx-auto flex flex-col max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl space-y-10">
          <img src="logo-color.png" alt="avatar" className="w-3/5 md:w-2/5 mx-auto mb-2 mt-12" />
          <div className="">
            <div className="text-3xl md:text-4xl">
              Multi-modal Benchmark
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4">
            {CONTRIBUTORS.map((item) => {
              return <div key={item[0]} className="flex justify-center items-center">
                <a href={item[1]} >
                  <img src={item[0]} className="h-20" />
                </a>
              </div>
            })}
          </div>

        </div>
        <div className="h-48"></div>
      </section>
    </>
  );
}

export default Home