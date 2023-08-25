import React from "react";
import Data from "../constants/data";
import Link from "next/link";

function Home() {
  const CONTRIBUTORS: [string, string][] = [
    ["ntu-1000.png", "https://www.ntu.edu.tw/english/"],
    ["utexas-primary-horizontal-logo.svg", "https://www.utexas.edu/"],
    ["AS-logo-01.png", "https://www.sinica.edu.tw/"],
    ["meta_ai.png", "https://ai.meta.com/"],
    ["cmu-1000.png", "https://www.cmu.edu/"],
    ["rembrand-1000.png", "https://www.rembrand.com/"],
  ]

  const subscribe_link = Data.subscribe_link;

  return (
    <>
      <section className="bg-white justify-center align-middle text-center flex flex-row items-center">
        <div className="mx-auto flex flex-col max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl">
          <img src="logo-color.png" alt="avatar" className="w-3/6 md:w-2/6 mx-auto mb-2 mt-12" />
          <div className="text-3xl md:text-4xl font-light">
            <strong>A</strong>udio-<strong>V</strong>isual <strong>S</strong>peech and audio processing <strong>U</strong>niversal <strong>PER</strong>formance <strong>B</strong>enchmark
          </div>
          <div className="mt-12 text-sm space-y-3 font-light">
            <p><strong><a href={subscribe_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Subscribe</a></strong> our e-news to receive all the latest information about SUPERB or <strong>contact us</strong> via</p>
            <p><strong><a href="mailto:superb.announcement@gmail.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">superb.announcement@gmail.com</a></strong></p>
          </div>
          <div className="mt-12 font-light text-sm space-y-2">
            <p className="text-xl">
              <strong>
                AV-SUPERB Challenge Timeline
              </strong>
            </p>
            <Link href="/leaderboard" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Challenge Policy</Link>
          </div>
          <ul className="list-disc w-5/6 md:w-4/6 xl:w-3/6 mx-auto text-left font-light text-sm mt-6">
            <li><strong className="italic">Mar 2, 2022</strong>: <Link
              href="/news#announcement2022"
              className="underline text-blue-400">Challenge announcement</Link>
            </li>
            <li><strong className="italic">Mar 2, 2022</strong>: <Link
              href="/leaderboard?subset=Public+Set"
              className="underline text-blue-400">
              Leaderboard
            </Link> is online and accepts submissions
            </li>
            <li><strong className="italic">Jul 15, 2022</strong>: <a
              href="https://slt2022.org/" target="_blank"
              rel="noopener noreferrer" className="underline text-blue-400">
              SLT workshop
            </a> paper submission (encouraged)</li>
            <li><strong className="italic">Sep 30, 2022</strong>: <a
              href="https://slt2022.org/" target="_blank"
              rel="noopener noreferrer" className="underline text-blue-400">
              SLT workshop
            </a> paper notification
            </li>
            <li><strong className="italic">Nov 1, 2022</strong>: System description paper deadline</li>
            <li><strong className="italic">Dec 20, 2022</strong>: Challenge result and invitee announcement</li>
            <li><strong className="italic">Jan 9 - 12, 2023: </strong><a href="https://slt2022.org/" target="_blank"
              rel="noopener noreferrer">SLT workshop</a> presentation</li>
          </ul>

          <div className="mt-12 font-light text-base space-y-2 w-5/6 mx-auto text-left">
            <div>
              SUPERB is a collection of benchmarking resources to
              evaluate the capability of a universal shared
              representation for speech processing. SUPERB
              consists of the following:
              <ol className="list-decimal mx-auto px-10 my-5">
                <li>
                  A benchmark of ten speech processing
                  tasks[1] built on established public
                  datasets,
                </li>
                <li>
                  A
                  <a
                    href="https://github.com/s3prl/s3prl"
                    target="_blank" rel="noopener noreferrer"
                    className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
                  >
                    BENCHMARK TOOLKIT
                  </a>
                  designed to evaluate and analyze
                  pretrained model performance on various
                  downstream tasks following the
                  conventional evaluation protocols from
                  speech communities,
                </li>
                <li>
                  A public
                  <Link
                    className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
                    href="/leaderboard"
                  >
                    LEADERBOARD
                  </Link>
                  for{" "}
                  <Link
                    className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
                    href="/submit"
                  >
                    SUBMISSIONS
                  </Link>
                  and performance tracking on the
                  benchmark.
                </li>
              </ol>
            </div>
            <div>
              SUPERB aims to offer the community a standard and
              comprehensive framework to train, evaluate, and
              compare the generalizability of universal speech
              representations on speech processing tasks. A
              universal speech representation can be leveraged to
              quickly adapt to diverse downstream tasks with
              minimum architectural change and downstream
              fine-tuning, so as to reduce the model development
              cycle time for new tasks.To emphasize on evaluating
              the quality of the learned universal representation,
              SUPERB puts an explicit constraint on the downstream
              model and limits its parameter size.
            </div>
            <div className="pt-5">
              The ultimate goal of SUPERB is to democratize the
              advancement in speech processing with powerful,
              generalizable, and reusable speech representations.
              SUPERB is a long-term maintained and continuously
              developing project. As we are gradually releasing
              new tasks and opening new tracks, we invite
              researchers to participate in the challenge and
              advance the research frontier together.
            </div>


          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-3 mt-16 space-y-5">
            {CONTRIBUTORS.map((item) => {
              return <div key={item[0]} className="flex justify-center items-center m-auto">
                <a href={item[1]} target="_blank" rel="noopener noreferrer">
                  <img src={item[0]} className="h-20 object-contain" />
                </a>
              </div>
            })}
          </div>
          <div className="divide-y-1 w-full md:w-5/6 m-auto">

            <div className="text-3xl md:text-4xl font-light py-5 text-center mt-20">
              Acknowledgement
            </div>
            <div className="py-8 px-5 text-base font-light">
              We thank <a
                href="https://mecoli1219.github.io/"
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
              >
                Chun-Mao Lai
              </a>, <a
                href="https://github.com/leo19941227"
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
              >
                Shu-wen Yang
              </a> and <a
                href="https://kaminyou.com/"
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg hover:bg-gray-100 px-2 py-0.5 mx-2 my-0.5 inline-block text-blue-400 border"
              >
                Ming-Yang Ho
              </a> for creating and maintaining the SUPERB official website.
            </div>
          </div>
          <div className="h-12"></div>
        </div>
      </section>
    </>
  );
}

export default Home