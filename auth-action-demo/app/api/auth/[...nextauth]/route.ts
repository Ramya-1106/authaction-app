import { AuthActionProvider } from "@/lib/auth/authactiont";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [AuthActionProvider()],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
