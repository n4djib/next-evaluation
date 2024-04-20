// import { getUsers } from "@/lib/drizzle/users";
import { Button } from "@nextui-org/react";

export default async function Home() {
  // const users = await getUsers();
  return (
    <div className="p-1 gap-1">
      hello, world
      {/* <div>{JSON.stringify(users)}</div> */}
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </div>
  );
}
