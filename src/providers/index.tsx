"use client";

import { ThemeProvider } from "@material-tailwind/react";

type Props = {
  children: React.ReactNode;
};

const ProvidersWrapper = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};

export default ProvidersWrapper;
