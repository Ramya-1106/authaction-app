// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, Session, User } from "next-auth";
import { AuthActionProvider } from "@/lib/auth/authactiont";

// Define authOptions with proper typing
export const authOptions: NextAuthOptions = {
  providers: [AuthActionProvider()],
  session: {
    strategy: "jwt" as const,  // Ensure 'jwt' is correctly typed
  },
  callbacks: {
    async jwt({ token, account, user, profile, trigger, isNewUser }: { token: JWT; account?: Account | null; user?: User | null; profile?: any; trigger?: "signIn" | "signUp" | "update"; isNewUser?: boolean }) {
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
export async function GET(req: Request, res: Response) {
    return NextAuth(authOptions); // Handle GET requests for session info
  }
  
  export async function POST(req: Request, res: Response) {
    return NextAuth( authOptions); // Handle POST requests for login/signup
  }
