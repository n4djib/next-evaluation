"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import PassworStrength from "@/components/PassworStrength";
import { resetPasswordAction } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password doesn't match!",
    path: ["confirmPassword"], // path is accepting only one field!
    // and maybe it triggers on confirmPassword changes
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPassForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    // mode: "onChange",
  });
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const strength = passwordStrength(watch().password).id;
    setPassStrength(strength);
  }, [watch().password]);

  const resetPassword: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPasswordAction(userId, data.password);
      console.log(result);
      toast.success("Password reset: " + result);
      router.push("/auth/signin");
    } catch (error) {
      console.log("---resetPassword error---");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow w-96"
    >
      <Input
        label="Password"
        {...register("password")}
        className="col-span-4"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyRound className="w-4" />}
        endContent={
          isVisiblePass ? (
            <EyeOff
              className="w-4 cursor-pointer"
              onClick={() => setIsVisiblePass(false)}
            />
          ) : (
            <Eye
              className="w-4 cursor-pointer"
              onClick={() => setIsVisiblePass(true)}
            />
          )
        }
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
      />
      <PassworStrength passStrength={passStrength} />
      <Input
        label="Confirm Password"
        {...register("confirmPassword")}
        className="col-span-4"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyRound className="w-4" />}
        endContent={
          isVisiblePass ? (
            <EyeOff
              className="w-4 cursor-pointer"
              onClick={() => setIsVisiblePass(false)}
            />
          ) : (
            <Eye
              className="w-4 cursor-pointer"
              onClick={() => setIsVisiblePass(true)}
            />
          )
        }
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        color="primary"
      >
        {isSubmitting ? "Please wait" : "Submit"}
      </Button>
    </form>
  );
};

export default ResetPassForm;
