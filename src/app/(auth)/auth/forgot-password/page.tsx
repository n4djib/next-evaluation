import Image from "next/image";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-2 items-center">
      <ForgotPasswordForm />
      <Image
        src="/forgotPass.png"
        alt="forgot Pass"
        width={400}
        height={400}
        className="col-span-2 place-self-center"
      />
    </div>
  );
};

export default ForgotPasswordPage;
