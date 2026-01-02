/* eslint-disable @next/next/no-img-element */
"use client";

import { logout, signInWithGoogle } from "@/Service/auth_service";
import AnimeItem from "@/components/custom/anime_Item";
import { Button } from "@/components/ui/button";
import { useAnimeMedia } from "@/contexts/anime_context";
import { useAuth } from "@/contexts/auth_context";
import { useEffect } from "react";

export default function SettingPage() {
  const user = useAuth();
  const { favorites, loadFavorite } = useAnimeMedia();

  const getFavoriteList = async () => {
    try {
      if (favorites) {
        loadFavorite();
        console.log("loading complete" + favorites);
      }
    } catch (error) {
      console.log("error in the main is" + error);
    }
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center pt-10 px-14">
      <div className="flex flex-col gap-5">
        {user && (
          <div className="flex flex-col items-center gap-5 border-dashed border-2 border-gray-500 rounded-2xl p-5">
            <h1>User: {user.displayName}</h1>
            <h1>Email: {user.email}</h1>
            <img
              className="rounded-full"
              src={user.photoURL || ""}
              alt={user.displayName || ""}
              width={100}
              height={100}
            />
            <Button onClick={logout}>Sign out</Button>
          </div>
        )}
        {!user && (
          <div className="flex flex-col items-center gap-5 border-dashed border-2 border-gray-500 rounded-2xl p-10">
            <h1>
              You are not <span className="font-medium">Signed in</span>
            </h1>
            <Button className="cursor-pointer" onClick={signInWithGoogle}>
              {
                <img
                  src={"/images/google_icon.png"}
                  alt="google icon"
                  width={20}
                  height={20}
                />
              }{" "}
              Sign in google
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full h-full mt-2">
        {favorites && (
          <>
            <h1 className="font-bold">My Favorite</h1>
            <div className="w-full grid grid-cols-7 gap-4 z-10">
              {favorites.map((item, index) => {
                return AnimeItem({ index, data: item });
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
