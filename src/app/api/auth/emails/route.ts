import { getEmailsList } from "@/lib/drizzle/users";

export async function GET() {
  const data = await getEmailsList();
  return Response.json({ data });
}
