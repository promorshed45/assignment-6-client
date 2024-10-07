import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { NextAuthOptions } from "next-auth";

import nexiosInstance from "@/src/config/nexios.config";

export const Authoptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        // Check if the provider is Google
        if (account.provider === "google") {
          // Ensure profile and account are defined
          if (!profile || !account) {
            console.error("Profile or account data is missing");

            return false;
          }

          // Make API request to log in
          const response: any = await nexiosInstance.post("/auth/login", {
            name: profile.name,
            email: profile.email,
            img: profile.picture,
          });

          const tokens = response.data.data;

          // Check for access and refresh tokens
          if (tokens.accessToken && tokens.refreshToken) {
            cookies().set("accessToken", tokens.accessToken);
            cookies().set("refreshToken", tokens.refreshToken);

            return true; // Sign-in successful
          } else {
            console.error("Tokens not found in response:", tokens);

            return false; // Tokens are missing
          }
        }
      } catch (error: any) {
        console.error("Error during sign-in:", error);

        return false;
      }

      return false; // Default return if provider is not Google
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
