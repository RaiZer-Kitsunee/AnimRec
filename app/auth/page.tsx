/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth_context";
import { signInWithGoogle } from "@/Service/auth_service";
import { Goal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center pt-10 px-14 bg-black">
      <div className="w-3/5 h-2/5 border-2 flex flex-col justify-center items-center gap-5 bg-white rounded-2xl">
        <Button className="cursor-pointer" onClick={signInWithGoogle}>
          {
            <img
              src={"/images/google_icon.png"}
              alt="google icon"
              width={20}
              height={20}
            />
          }{" "}
          Sign in Google
        </Button>
        {user && (
          <div className="flex items-center gap-5 border-2 border-dashed rounded-2xl p-5">
            <h1 className="text-md text-gray-500">welcome</h1>
            <h3 className="text-sm font-medium">{user.displayName}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
