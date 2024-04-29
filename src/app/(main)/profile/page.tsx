import { authOptions } from "@/lib/next-auth/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div>
      <h2 className="text-2xl ">Profile Page</h2>
      <br />
      <div>
        <Image
          src={user?.image ?? "/empty-profile.png"}
          width={200}
          height={200}
          alt="Profile Image"
          className="shadow-lg border-1 rounded-lg"
        />
        <br />
        <p>
          <b>ID:</b> {user?.id}
        </p>
        <p>
          <b>Username:</b> {user?.name}
        </p>
        <p>
          <b>Email:</b> {user?.email}
        </p>
        <p>
          <b>Phone:</b> {user?.phone}
        </p>
        <p>
          <b>Roles:</b> {JSON.stringify(user?.roles)}
        </p>
        <p>
          <b>Created At:</b> {user?.createdAt.toString()}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
