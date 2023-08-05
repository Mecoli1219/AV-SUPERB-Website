import React, { useState } from "react";
import Login from "../components/LeaderBoard";

function Home() {


  return (
    <>
      <section className="bg-white justify-center align-middle text-center flex flex-row items-center">
        <div className="mx-auto flex flex-col max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl space-y-10">
          <div className="mt-12"></div>
          <Login />
        </div>
      </section>
    </>
  );
}

export default Home