import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
          {/* Signed in as {session.user.email} <br /> */}
          <button type="button" className="btn btn-outline-light" onClick={() => signOut()}>Sign out</button>

      </>
    )
  }
  return (
    <>
        <button type="button" className="btn btn-outline-light" onClick={() => signIn()}>Admin</button>
    </>
  )
}

