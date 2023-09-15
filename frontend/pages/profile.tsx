import { useSession, signIn, signOut } from "next-auth/react"
import Profile from "../components/Profile"
function ProfilePage() {
  const { data: session } = useSession()
  if (session) {
    return <section className="bg-transparent justify-center align-middle text-center flex flex-row items-center">
      <div className="mx-auto flex flex-col max-w-full sm:max-w-xl xl:max-w-5xl lg:max-w-3xl md:max-w-2xl space-y-10">
        <div className="mt-2"></div>
        <Profile />
        {/* <div className="mt-10vh"></div> */}
      </div>
    </section>
  }
  return <>
    Not signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

ProfilePage.requireAuth = true;

export default ProfilePage;