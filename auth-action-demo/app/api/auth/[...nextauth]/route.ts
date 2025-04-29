// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, Session, User } from "next-auth";
import { AuthActionProvider } from "@/lib/auth/authactiont";

export const authOptions: NextAuthOptions = {
  providers: [AuthActionProvider()],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: User | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

