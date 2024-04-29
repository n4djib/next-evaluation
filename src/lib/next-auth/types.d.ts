import { User } from "@/lib/drizzle/schema";

declare module "next-auth" {
  interface Session {
    // user: User;
    // FIXME: this should be removed
    // because the type of roles will come from schema
    user: User & { roles: string[] };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // user: User;
    user: User & { roles: string[] };
  }
}
