/* eslint-disable @next/next/no-img-element */
"use client";

import { logout } from "@/Service/auth_service";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth_context";

export default function SettingPage() {
  const user = useAuth();
  return (
    <div className="w-screen h-screen flex justify-center items-center pt-10 px-14">
      <div className="flex flex-col gap-5">
        {user && (
          <div className="flex flex-col items-center gap-5 border-dashed border-2 border-gray-500 rounded-2xl p-5">
            <h1>user: {user.displayName}</h1>
            <h1>user email: {user.email}</h1>
            <img
              src={user.photoURL || ""}
              alt={user.displayName || ""}
              width={100}
              height={100}
            />
          </div>
        )}
        <Button onClick={logout}>sign out</Button>
      </div>
    </div>
  );
}
