import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NonLoginSubmit from "../components/submit/NonLoginSubmit";
import LoginSubmit from "../components/submit/LoginSubmit";
import Clock from "../components/submit/Clock";

function Submit() {
  const { data: session, status: sessionStatus } = useSession();
  const loading = sessionStatus === 'loading';
  const isLogin = session?.isLogin;

  if (loading) {
    return <>Loading app...</>;
  }


  return (
    <>
      <section className="bg-white justify-center align-middle text-center flex flex-row items-center">
        <div className="mx-auto flex flex-col w-80screen sm:w-70screen lg:w-60screen space-y-1">
          <div className="border-b w-full pb-4">
            <div className="mt-16 text-2xl font-bold text-gray-500">Submission</div>
            {/* display time in 24 hr format */}
            <Clock />
          </div>
          {
            isLogin ?
              <LoginSubmit token={session.token as string} />
              :
              <NonLoginSubmit />
          }
        </div>
      </section>
    </>
  );
}

// Submit.requireAuth = true;

export default Submit