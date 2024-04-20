// import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";

export const getUser = async (username: string) => {
  const res = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username),
  });
  return res;
};

export const getUsers = async () => {
  const res = await db.select().from(users);
  return res;
};

// export const getUsers2 = async () => {
//   const res = await db.query.users.findMany();
//   return res;
// };
