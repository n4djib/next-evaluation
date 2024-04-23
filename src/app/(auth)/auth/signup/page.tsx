// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = async () => {
  // const session = await getServerSession();
  // console.log("Signup Page:", { session });

  // if (session) {
  //   // redirect("/");
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already Signed up?</p>
        <Link className="text-blue-500" href={"/auth/signin"}>
          Sign In
        </Link>
      </div>
      <SignupForm />
      <Image src="/login.jpg" alt="Login Form" width={500} height={500} />
    </div>
  );
};

export default SignupPage;
