import { getUsers } from "@/lib/drizzle/users";

export default async function Home() {
  const users = await getUsers();
  return (
    <div className="p-1 gap-1">
      hello, world
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}
