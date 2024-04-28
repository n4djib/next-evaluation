import Appbar from "@/components/Appbar";
import ProvidersWrapper from "@/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/authOptions";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // const serverSession = null;
  const serverSession = await getServerSession(authOptions);
  // const serverSession = await getServerSession();

  return (
    <>
      <ProvidersWrapper serverSession={serverSession}>
        <Appbar />
        <div className="p-2">{children}</div>
      </ProvidersWrapper>
    </>
  );
};

export default layout;
