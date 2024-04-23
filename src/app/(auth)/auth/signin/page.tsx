import { getServerSession } from "next-auth";
import Link from "next/link";
import SigninForm from "./SigninForm";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/next-auth/authOptions";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

const SigninPage = async ({ searchParams }: Props) => {
  console.log({ searchParams });
  const session = await getServerSession(authOptions);
  console.log("LoginPage:", { session });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center flex-col ">
      <SigninForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
