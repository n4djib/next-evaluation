"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  serverSession: Session | null;
};

function AuthProvider({ children, serverSession }: Props) {
  if (serverSession === null) {
    return <SessionProvider>{children}</SessionProvider>;
  }
  return <SessionProvider session={serverSession}>{children}</SessionProvider>;
}

export default AuthProvider;
