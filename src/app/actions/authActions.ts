"use server";

import { NewUser } from "@/lib/drizzle/schema";
import { createUser } from "@/lib/drizzle/users";

export async function registerNewUser(user: NewUser) {
  const { password, ...createdUser } = await createUser(user);
  return createdUser;
}
