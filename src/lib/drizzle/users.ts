// import { and, eq } from "drizzle-orm";
import { eq, getTableColumns } from "drizzle-orm";
import { db } from "./db";
import { NewUser, User, users } from "./schema";
import { hash } from "bcrypt";

type GetUserProp = {
  field: keyof User;
  value: Exclude<User[keyof User], null>;
};
// field: "id" | "name" | "email" | "password" | "emailVerified" | "createdAt"
// value: string | Date
// TODO: can we relate Date to "emailVerified" | "createdAt"

// type GetUserProp2 = { id: string } | { age: number };
// const aaaaaaa: GetUserProp2 = {
//   age: 88,
// };

export const getUser = async ({ field, value }: GetUserProp) => {
  // return await db.query.users.findFirst({
  //   where: (users, { eq }) => eq(users[field], value),
  // });
  return await db.query.users.findFirst({
    where: eq(users[field], value),
  });
};

export const getUsers = async () => {
  return await db.select().from(users);
  // return await db.query.users.findMany();
  // const { password, ...rest } = getTableColumns(users);
  // const result = await db.select({ ...rest }).from(users);
  // return result;
};

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

// used by refine in zod signUp
export const getEmailsList = async () => {
  const res = await db.select({ email: users.email }).from(users);
  const emails = res.map((record) => record.email);
  return emails;
};

type UpdateProps = {
  [P in keyof Omit<User, "id" | "createdAt">]?: User[P];
};
// & {
//   id: string;
// };

// TODO: i can include id in the props and make mandatory
export const updateUser = async (id: string, props: UpdateProps) => {
  const res = await db
    .update(users)
    .set(props)
    .where(eq(users.id, id))
    .returning({ userId: users.id })
    .then((res) => res[0] ?? null);
  return res;
};
