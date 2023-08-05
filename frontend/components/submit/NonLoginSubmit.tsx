import { signIn } from "next-auth/react";

const NonLoginSubmit = () => {

    return <>
        <div className="pt-10 font-bold italic">
            Please <span className="text-blue-600 underline cursor-pointer" onClick={() => signIn('google')}>login</span> first before submission
        </div>
    </>
}

export default NonLoginSubmit;
