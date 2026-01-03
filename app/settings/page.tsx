/* eslint-disable @next/next/no-img-element */
"use client";

import { logout, signInWithGoogle } from "@/Service/auth_service";
import AnimeItem from "@/components/custom/anime_Item";
import { Button } from "@/components/ui/button";
import { useAnimeMedia } from "@/contexts/anime_context";
import { useAuth } from "@/contexts/auth_context";
import { ShipWheelIcon } from "lucide-react";
import { useEffect } from "react";

export default function SettingPage() {
  const user = useAuth();
  const { loading, favorites, loadFavorite, wishlists, loadWishlist } =
    useAnimeMedia();

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

  const getWishlistList = async () => {
    try {
      if (wishlists) {
        loadWishlist();
        console.log("loading complete" + wishlists);
      }
    } catch (error) {
      console.log("error in the main is" + error);
    }
  };

  useEffect(() => {
    getFavoriteList();
    getWishlistList();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ShipWheelIcon size={60} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-5 bg-gray-950 pt-10 pb-5 pl-14 pr-5 overflow-y-scroll">
      <div className="w-full h-full flex flex-col gap-5 ">
        {user && (
          <div className="flex items-center justify-between bg-white gap-5 border-2 border-gray-500 rounded-2xl p-5">
            <div className="flex gap-4">
              <img
                className="rounded-full"
                src={user.photoURL || ""}
                alt={user.displayName || ""}
                width={100}
                height={100}
              />
              <div className="flex flex-col justify-center">
                <h1>User: {user.displayName}</h1>
                <h1>Email: {user.email}</h1>
              </div>
            </div>

            <Button className="cursor-pointer" onClick={logout}>
              Sign out
            </Button>
          </div>
        )}
        {!user && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-white border-2 border-gray-500 rounded-2xl p-10">
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
      {user && (
        <div className="flex bg-white border-2 border-gray-500 p-4 rounded-2xl gap-10">
          <div className="flex flex-col items-center w-full h-full mt-2">
            {favorites && (
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">My Favorite</h1>
                <div className="w-full grid grid-cols-4 gap-4 z-10">
                  {favorites.map((item, index) => {
                    return AnimeItem({ index, data: item });
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full h-full mt-2">
            {wishlists && (
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">My Wishlist</h1>
                <div className="w-full grid grid-cols-4 gap-4 z-10">
                  {wishlists.map((item, index) => {
                    return AnimeItem({ index, data: item });
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
