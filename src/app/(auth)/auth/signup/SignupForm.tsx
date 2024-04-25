"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import { UserRound, Mail, KeyRound, Eye, EyeOff, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PassworStrength from "./PassworStrength";
import { registerNewUser } from "@/app/actions/authActions";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { NewUser } from "@/lib/drizzle/schema";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(45, "Username must be less than 45 characters")
      .regex(
        new RegExp("^[a-zA-Z0-9]+$"),
        "No special characters are allowed!"
      ),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().refine((val) => validator.isMobilePhone(val)),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password doesn't match!",
    path: ["confirmPassword"], // path is accepting only one field!
    // and maybe it triggers on confirmPassword changes
  })
  .refine(
    async (data) => {
      console.log("refining email");
      const res = await fetch("http://localhost:3000/api/auth/emails");
      const { data: emails } = await res.json();
      return !emails.includes(data.email);
    },
    {
      message: "This Email is already used.",
      path: ["email"],
    }
  );

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    // reset,
    control,
    watch,
    formState: { errors },
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

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;

    try {
      const res = await registerNewUser(user);
      toast.success("The User registered successfully.");
      // reset();
      toast.success("Wellcome, now you can Sign In");
      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="grid grid-cols-4 gap-3 p-2 shadow border rounded-md"
      // className="gap-3 p-2 shadow border rounded-md"
    >
      <Input
        label="User Name"
        {...register("name")}
        className="col-span-4"
        startContent={<UserRound className="w-4" />}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
      />
      <Input
        label="Email"
        {...register("email")}
        className="col-span-4"
        startContent={<Mail className="w-4" />}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
      />
      <Input
        label="Phone"
        {...register("phone")}
        className="col-span-4"
        startContent={<Phone className="w-4" />}
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
      />
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
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-4"
          >
            I accept the{" "}
            <Link className="text-blue-500" href="#">
              terms of service
            </Link>
          </Checkbox>
        )}
      />
      {!!errors.accepted && (
        <p className="text-red-500">{errors.accepted.message}</p>
      )}
      <div className="flex justify-center col-span-2">
        <Button color="primary" type="submit" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
