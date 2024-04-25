"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, KeyRound, UserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {
  callbackUrl?: string;
};

const FormSchema = z.object({
  name: z.string({ required_error: "Please enter your Username" }),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SigninForm = ({ callbackUrl }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const signin: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.name,
      password: data.password,
    });

    if (result && !result?.ok) {
      toast.error(result?.error);
      return;
    }

    toast.success("Wellcome to Next-Evaluaion");
    router.push(callbackUrl ? callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(signin)}
      className="flex flex-col gap-2 border rounded-md shadow overflow-hidden"
    >
      <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
        Sign In Form
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Input
          label="User Name"
          {...register("name")}
          className="col-span-2"
          startContent={<UserRound className="w-4" />}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
        <Input
          label="Password"
          {...register("password")}
          className="col-span-2"
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
        <div className="flex justify-center col-span-2 gap-2">
          <Button color="primary" type="submit" className="w-48">
            Sign In
          </Button>
          <Button href="/auth/signup" as={Link}>
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
