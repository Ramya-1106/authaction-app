"use client";

import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    const tenantDomain = process.env.NEXT_PUBLIC_AUTHACTION_TENANT_DOMAIN;
    const postLogoutRedirectUri = `${window.location.origin}`;

    if (!tenantDomain || !session?.idToken) {
      return;
    }
    const logoutUrl = `https://${tenantDomain}/oauth2/logout?id_token_hint=${session.idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
    signOut({
      redirect: false,
    }).then(() => {
      window.location.href = logoutUrl;
    });
  };

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <p className="text-lg font-semibold text-gray-700">Loading Dashboard...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-red-600 text-lg">Access denied. Please log in.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-indigo-600 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4 text-md">
            <li className="hover:text-yellow-300 transition cursor-pointer">🏠 Home</li>
            <li className="hover:text-yellow-300 transition cursor-pointer">📄 Profile</li>
            <li className="hover:text-yellow-300 transition cursor-pointer">⚙️ Settings</li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
           Logout
        </button>
      </aside>

      <section className="flex-1 bg-gray-100 p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome, {session.user?.name}</h1>
          <p className="text-lg text-gray-600 mb-6">Here's your account summary:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-700">👤 Name</p>
              <p className="text-xl font-semibold text-blue-900">{session.user?.name}</p>
            </div>
            <div className="bg-gradient-to-br from-green-200 to-green-100 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-700">📧 Email</p>
              <p className="text-xl font-semibold text-green-900">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
