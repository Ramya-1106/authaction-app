// lib/auth/authaction.ts

import type { OAuthConfig } from "next-auth/providers/oauth";

export interface AuthActionProfile {
  sub: string;
  name: string;
  email: string;
}

export const AuthActionProvider = (): OAuthConfig<AuthActionProfile> => ({
  id: "authaction",
  name: "AuthAction",
  type: "oauth",
  wellKnown: `https://${process.env.AUTHACTION_TENANT_DOMAIN}/.well-known/openid-configuration`,
  clientId: process.env.AUTHACTION_CLIENT_ID!,
  clientSecret: process.env.AUTHACTION_CLIENT_SECRET!,
  authorization: { params: { scope: "openid profile email" } },
  token: { params: { grant_type: "authorization_code" } },
  idToken: true,
  checks: ["pkce", "state"],
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
    };
  },
});
