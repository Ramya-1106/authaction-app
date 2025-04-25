// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextAuth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
    </main>
  );
}
