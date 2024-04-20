import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  // const session = await getServerSession();
  // console.log("LoginPage:", { session });

  // if (session) {
  //   // redirect("/");
  // }

  return <div>signin page s</div>;
};

export default page;
