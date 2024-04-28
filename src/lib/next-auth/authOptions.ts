import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../drizzle/schema";
import { getUser } from "@/lib/drizzle/users";
import { compare } from "bcrypt";

// const ret = await sendMail({
//   to: "n4djib@gmail.com",
//   subject: "test",
//   body: "test1",
// });

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

        const user = await getUser({
          field: "name",
          value: credentials.username,
        });

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

        if (!user.emailVerified) {
          throw new Error("Account not activated, check your Email");
        }

        const { password, ...userWitoutPassword } = user;

        // return userWitoutPassword;
        return { ...userWitoutPassword, roles: ["ADMIN", "MANAGER"] };
      },
    }),
  ],

  // session: {
  //   strategy: "jwt",
  // },

  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // the "user" is returned from CredentialsProvider at login
      if (user) {
        // the type is User: why it is ok without password
        // and an added roles field?
        token.user = user as User;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
  },

  events: {},
  // debug: true,
};
