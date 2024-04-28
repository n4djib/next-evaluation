"use server";

import { NewUser } from "@/lib/drizzle/schema";
import { createUser, getUser, updateUser } from "@/lib/drizzle/users";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { sendMail } from "@/lib/mail/node-mailer";
import { compileTemplate } from "@/lib/mail/templateCompiler";
import { activationTemplate } from "@/lib/mail/templates/activation-template";
import { resetPasswordTemplate } from "@/lib/mail/templates/reset-password-template";
import { hash } from "bcrypt";

export async function registerNewUserAction(user: NewUser) {
  const { password, ...createdUser } = await createUser(user);

  // send verification email
  const jwt = signJwt(
    {
      id: createdUser.id,
    },
    {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    }
  );
  // ('100')     // 100
  // ('5s')      // 5000
  // ('1m')      // 60000
  // ('2h')      // 7200000
  // ('2.5 hrs') // 9000000
  // ('1d')      // 86400000
  // ('2 days')  // 172800000
  // ('1y')      // 31557600000
  // ('-3 days') // -259200000
  // ('-1h')     // -3600000

  const activationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/activation/${jwt}`;

  const html = compileTemplate({
    name: createdUser.name,
    url: activationUrl,
    template: activationTemplate,
  });

  const sendResult = await sendMail({
    to: createdUser.email,
    subject: "NEXT-EVAL - Sign Up Email Verification",
    body: html,
  });

  return createdUser;
  // TODO: return { createdUser, mail };
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<
  | "failedVerification"
  | "userNotExist"
  | "alreadyActivated"
  | "failedToUpdate"
  | "success"
>;

export const activateUserAction: ActivateUserFunc = async (
  jwtUserId: string
) => {
  const payload = verifyJwt(jwtUserId);
  // if (!payload || payload === "TokenExpiredError" || payload === "JsonWebTokenError")
  if (!payload?.id) {
    // should return the reason for failure
    return "failedVerification";
  }

  // get user
  const userId = payload?.id;
  const user = await getUser({ field: "id", value: userId });
  if (!user) return "userNotExist";

  // if verified
  if (user.emailVerified) return "alreadyActivated";

  // update user
  const update = await updateUser(userId, {
    emailVerified: new Date(),
  });
  if (!update) return "failedToUpdate";

  return "success";
};

export async function forgotPasswordAction(email: string) {
  const user = await getUser({ field: "email", value: email });

  if (!user) throw new Error("The user does not exist");

  if (!user.emailVerified) throw new Error("The user is not verified");

  // but this means if we use activation token in here we can reset the pass
  // not a problem because it is signed ad expires after 24h
  const jwt = signJwt(
    {
      id: user.id,
    },
    {
      expiresIn: process.env.JWT_RESET_PASS_EXPIRY_TIME,
    }
  );
  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${jwt}`;

  // put name and url in an object
  const html = compileTemplate({
    name: user.name,
    url: resetPasswordUrl,
    template: resetPasswordTemplate,
  });

  // send email
  const sendResult = await sendMail({
    to: user.email,
    subject: "NEXT-EVAL - Reset Password",
    body: html,
  });

  return sendResult;
}

type ResetPasswordFunc = (
  jwt: string,
  password: string
) => Promise<"success" | "failed" | "jwt_error">;

export const resetPasswordAction: ResetPasswordFunc = async (
  userId: string,
  password: string
) => {
  const user = await updateUser(userId, {
    password: await hash(password, 10),
  });
  if (!user) return "failed";

  return "success";
};
