import axios from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { v4 } from "uuid";
import { convertBlobToFile, getImageFromURL } from "./utils";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, user, token }) {
      session.token = {
        jwt: token.jwt,
        user: token.user,
      };
      return session;
    },
    async jwt({ token, user, account }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await axios.get(
          `${process.env.API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`,
        );
        if (token.picture) {
          const image = await getImageFromURL(token.picture);
          const file = convertBlobToFile(image, `profile-image-${user.id}`);
          const formData = new FormData();
          formData.append("files", file, `profile-image-${user.id}`);
          formData.append("ref", "plugin::users-permissions.user");
          formData.append("refId", `${response.data.user.id}`);
          formData.append("field", "image");
          formData.append("path", `users/${response.data.user.id}`);
          await axios.post(`${process.env.API_URL}/upload`, formData, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`,
            },
          });
        }
        await axios.put(
          `${process.env.API_URL}/user/me`,
          {
            name: token.name,
            username: v4(),
          },
          {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`,
            },
          },
        );
        console.log("Provider ", account?.provider);
        token.user = response.data.user;
        token.jwt = response.data.jwt;
        token.id = response.data.user.id;
        console.log("Token ", token);
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
