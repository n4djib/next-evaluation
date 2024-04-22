import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../drizzle/users";
import { compare } from "bcrypt";

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
        console.log("1-:", { credentials });
        if (!credentials?.username)
          throw new Error("Please Provide the Username");
        if (!credentials?.password)
          throw new Error("Please Provide the Password");

        const user = await getUser(credentials.username);
        console.log("2-:", { user });

        if (!user) throw new Error("Username or Password is not correct. 1");

        const isPassworCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPassworCorrect)
          throw new Error("Username or Password is not correct. 2");

        const { password, ...userWitoutPassword } = user;

        return userWitoutPassword;
      },
    }),
  ],

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      return token;
    },

    async session({ session, token, user }) {
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
