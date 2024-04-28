import { activateUserAction } from "@/app/actions/authActions";

type Props = {
  params: {
    jwt: string;
  };
};

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUserAction(params.jwt);

  return (
    <div className="p-2">
      <br />
      <div>Activation Token : {params.jwt}</div>
      <br />
      <div>Result :</div>
      {result === "success" && (
        <p className="text-green-500">Successfully activated</p>
      )}
      {result === "alreadyActivated" && (
        <p className="text-slate-500">Already activated</p>
      )}
      {result === "userNotExist" && (
        <p className="text-orange-500">User not found</p>
      )}
      {result === "failedToUpdate" && (
        <p className="text-red-500">Failed to activate</p>
      )}
      {result === "failedVerification" && (
        <p className="text-red-500">Token Expired</p>
      )}
    </div>
  );
};

export default ActivationPage;
