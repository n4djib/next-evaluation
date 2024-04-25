// import { and, eq } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { NewUser, User, users } from "./schema";
import { hash } from "bcrypt";

export const getUser = async (username: string) => {
  const res = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username),
  });
  return res;
};

export const getUserById = async (id: string) => {
  const res = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
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

type UpdateProps = {
  [P in keyof Omit<User, "id" | "createdAt">]?: User[P];
};

export const updateUser = async (id: string, props: UpdateProps) => {
  const res = await db
    .update(users)
    .set(props)
    .where(eq(users.id, id))
    .returning({ userId: users.id })
    .then((res) => res[0] ?? null);
  return res;
};
