"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 items-center">
      {session && session.user ? (
        <>
          <p>{session.user.name}</p>{" "}
          <Link
            href="/api/auth/signout"
            className="text-sky-500 hover:text-sky-600"
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Button
            as={Link}
            href="/api/auth/signin"
            className="text-sky-500 hover:text-sky-600"
          >
            Sign In
          </Button>

          <Button as={Link} color="primary" href="/auth/signup" variant="flat">
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;