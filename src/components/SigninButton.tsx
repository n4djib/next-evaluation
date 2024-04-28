// "use client";

// import { Button } from "@nextui-org/react";
// import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/next-auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

const SigninButton = async () => {
  // const { data: session } = useSession();
  // TODO: dedup getServerSession
  const session = await getServerSession(authOptions);
  // const session = null;

  return (
    <div className="flex gap-3 items-center">
      {session && session.user ? (
        <>
          <p>{session.user.name}</p>
          <Link href="/api/auth/signout" className="">
            Sign Out
          </Link>
        </>
      ) : (
        <div className="flex gap-3">
          <Link href="/auth/signin" className="">
            Sign In
          </Link>
          <Link color="primary" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default SigninButton;
