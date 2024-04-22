import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../drizzle/users";
import { compare } from "bcrypt";
import { User } from "../drizzle/schema";
import { getCurrentTime } from "../utils";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials?.username)
          throw new Error("Please Provide the Username");
        if (!credentials?.password)
          throw new Error("Please Provide the Password");

        const user = await getUser(credentials.username);
        if (!user) {
          throw new Error("Username or Password is not correct. 1");
        }

        const isPassworCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPassworCorrect) {
          throw new Error("Username or Password is not correct. 2");
        }

        const { password, ...userWitoutPassword } = user;

        // return userWitoutPassword;
        return { ...userWitoutPassword, roles: ["ADMIN", "MANAGER"] };
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // the "user" is returned from CredentialsProvider at login

      // var time = getCurrentTime()
      // console.log("--Jwt callback--", time);
      // console.log({ token, user, account, profile });

      if (user) {
        // the type is User: why it is ok without password and an added roles field?
        token.user = user as User;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token.user;

      var time = getCurrentTime();
      console.log("--Session callback--", time);
      console.log({ session, token, user });
      // console.log("user from token::::", token.user);
      console.log("\n");

      return session;
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
  },

  pages: {},
  // pages: { signIn: "/auth/login" },

  events: {},
  debug: true,
};
