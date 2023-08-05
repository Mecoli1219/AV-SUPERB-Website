import Link from "next/link";

const LoginSubmit = () => {

    return <>
        <div className="pt-10 text-gray-400">
            Make sure to read the <Link href="/rules" className="text-blue-400 underline cursor-pointer">Rules</Link> before
            submitting to the <Link href="/leaderboard" className="text-blue-400 underline cursor-pointer">SUPERB Benchmark</Link>.
        </div>
        <div className="pt-10 text-gray-400">
            After your submission, the row of submission will <span className="font-bold italic">only</span> appear on the Profile tab and will not appear in the leaderboard. You can select the "Show" button in the Profile tab to control whether to show it on leaderboard or not.
        </div>
    </>
}

export default LoginSubmit;
