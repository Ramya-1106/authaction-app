"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center h-screen bg-gradient-to-r from-sky-100 to-indigo-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome to the AuthAction Demo</h1>
        <p className="text-lg text-gray-600 mb-8">
          {session ? "You're logged in!" : "Please log in to access your dashboard."}
        </p>

        {!session ? (
          <button
            onClick={() => signIn("authOptions")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Login
          </button>
        ) : (
          <>
            <p className="mb-6 text-gray-800">
              Welcome, <span className="font-semibold">{session.user?.name}</span> (
              {session.user?.email})
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <button className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                  Go to Dashboard !
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
