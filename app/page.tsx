"use client";
import { ShipWheel } from "lucide-react";
import { useEffect, useState } from "react";
import AnimeItem from "../components/custom/anime_Item";
import { useAnimeMedia } from "@/contexts/anime_context";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { items, loadItems } = useAnimeMedia();

  const getAnimeList = async () => {
    setLoading(true);
    try {
      loadItems();
    } catch (error) {
      console.log("error in the main is" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
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
