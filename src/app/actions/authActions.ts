"use server";

import { NewUser } from "@/lib/drizzle/schema";
import { createUser, getUserById, updateUser } from "@/lib/drizzle/users";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { sendMail } from "@/lib/node-mailer/mail";

export async function registerNewUser(user: NewUser) {
  const { password, ...createdUser } = await createUser(user);

  // send verification email
  const jwt = signJwt(
    {
      id: createdUser.id,
    },
    {
      expiresIn: "1d",
      // expiresIn: "1d",
    }
  );
  // ('100')     // 100
  // ('5s')      // 5000
  // ('1m')      // 60000
  // ('2h')      // 7200000
  // ('2.5 hrs') // 9000000
  // ('10h')     // 36000000
  // ('1d')      // 86400000
  // ('2 days')  // 172800000
  // ('1y')      // 31557600000
  // ('-3 days') // -259200000
  // ('-1h')     // -3600000
  // ('-200')    // -200

  const body = `<p>click this 
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/activation/${jwt}"
    >Link</a> to activate your account.</p>`;

  const mail = await sendMail({
    to: createdUser.email,
    subject: "NEXT-EVAL Sign Up Verification Email",
    body,
  });

  return createdUser;
  // return [createdUser, mail];
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

export const activateUser: ActivateUserFunc = async (jwtUserId: string) => {
  const payload = verifyJwt(jwtUserId);
  if (
    !payload
    // || payload === "TokenExpiredError"
    // || payload === "JsonWebTokenError"
  ) {
    return "failedVerification";
  }
  // should return the reason for failure

  // get user
  const userId = payload?.id;
  const user = await getUserById(userId);
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
