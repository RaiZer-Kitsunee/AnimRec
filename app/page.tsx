"use client";

import AnimeItem from "@/components/custom/anime_Item";
import { useAnimeMedia } from "@/contexts/anime_context";
import { ShipWheel } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { items, loading, loadItems } = useAnimeMedia();

  const getAnimeList = async () => {
    try {
      loadItems();
    } catch (error) {
      console.log("error in the main is" + error);
    }
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ShipWheel size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-scroll pl-14 py-10 pr-2">
      {items && (
        <div className="w-full grid grid-cols-7 gap-4 z-10">
          {items.map((item, index) => {
            return AnimeItem({ index, data: item });
          })}
        </div>
      )}
    </div>
  );
}
