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
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center flex-col ">
      <SigninForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgot-password"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
