import React, { useState } from "react";
import Leaderboard from "../components/LeaderBoard";

function Submit() {


  return (
    <>
      <section className="bg-transparent justify-center align-middle text-center flex flex-row items-center">
        <div className="mx-auto flex flex-col max-w-full sm:max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl space-y-10">
          <div className="mt-2"></div>
          <Leaderboard />
          <div className="mt-10vh"></div>
        </div>
      </section>
    </>
  );
}


export default Submit