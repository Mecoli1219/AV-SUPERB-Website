import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NonLoginSubmit from "../components/submit/NonLoginSubmit";
import LoginSubmit from "../components/submit/LoginSubmit";

function Submit() {
  const { data: session, status: sessionStatus } = useSession();
  const loading = sessionStatus === 'loading';
  const isLogin = session?.isLogin;
  const [date, setDate] = useState(new Date());
  console.log(session)

  const refreshClock = () => {
    setDate(new Date());
  };

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (date: Date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }


  useEffect(() => {
    const timer = setInterval(() => refreshClock(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });


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
            <div className="mt-2 text-md text-gray-400">{formatDate(date)}</div>
          </div>
          {
            isLogin ?
              <LoginSubmit />
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