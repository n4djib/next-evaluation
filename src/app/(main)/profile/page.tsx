import { authOptions } from "@/lib/next-auth/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h2>Profile Page</h2>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
};

export default ProfilePage;
