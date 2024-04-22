// import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { NewUser, users } from "./schema";
import { hash } from "bcrypt";

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

export const createUser = async (user: NewUser) => {
  const hashedPassword = await hash(user.password, 10);

  const newUser = {
    ...user,
    password: hashedPassword,
  };

  const res = await db
    .insert(users)
    .values(newUser)
    .returning()
    .then((res) => res[0] ?? null);
  return res;
};

export const getEmailsList = async () => {
  const res = await db.select({ field1: users.email }).from(users);
  const emails = res.map((record) => record.field1);
  return emails;
};
