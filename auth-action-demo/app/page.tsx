// app/page.tsx

"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to the AuthAction Demo</h1>

      {!session ? (
        <>
          <p>You are not logged in.</p>
          <button onClick={() => signIn("authaction")}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user?.name} ({session.user?.email})</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </main>
  );
}
