"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { forgotPasswordAction } from "@/app/actions/authActions";
import toast from "react-hot-toast";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    // mode: "onChange",
  });

  const forgotRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const res = await forgotPasswordAction(data.email);
      toast.success("A reset email was sent, check your email");
      // TODO reset()
    } catch (error) {
      console.log("---forgotRequest error---");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(forgotRequest)}
      className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow"
    >
      <div className="text-center p-2">Enter your Email</div>
      <Input
        label="Email"
        {...register("email")}
        startContent={<Mail className="w-4" />}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
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

export default ForgotPasswordForm;
