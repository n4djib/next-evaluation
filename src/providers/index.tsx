"use client";

import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "./AuthProvider";
import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  serverSession: Session | null;
};

const ProvidersWrapper = ({ children, serverSession }: Props) => {
  return (
    <AuthProvider serverSession={serverSession}>
      <NextUIProvider>{children}</NextUIProvider>
    </AuthProvider>
  );
};

export default ProvidersWrapper;
