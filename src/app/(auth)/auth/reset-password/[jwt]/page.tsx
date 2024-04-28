import { verifyJwt } from "@/lib/jwt";
import ResetPassForm from "./ResetPassForm";

type Props = {
  params: {
    jwt: string;
  };
};

const ResetPage = ({ params }: Props) => {
  const decoded = verifyJwt(params.jwt);

  return (
    <div>
      <h2>Reset Page</h2>
      <br />
      <div>
        {decoded && decoded.id ? (
          <ResetPassForm userId={decoded.id} />
        ) : (
          <p className="text-red-500">Token Expired</p>
        )}
      </div>
    </div>
  );
};

export default ResetPage;
