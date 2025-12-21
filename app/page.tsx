"use client";
import { fetchSortedAnimeDataList } from "@/Service/fetch_data";
import { ShipWheel } from "lucide-react";
import { useEffect, useState } from "react";
import AnimeItem from "./components/anime_Item";

export default function Home() {
  const [animeData, setAnimeData] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);

  const getAnimeList = async () => {
    setLoading(true);
    try {
      const response = await fetchSortedAnimeDataList("POPULARITY_DESC");
      if (response.success) {
        setAnimeData(response.data);
      }
    } catch (error) {
      console.log("error in the main is" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-scroll pl-14 py-10 pr-2">
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <ShipWheel size={50} className="animate-spin" />
        </div>
      )}
      {animeData && (
        <div className="w-full grid grid-cols-7 gap-4 z-10">
          {animeData.map((item, index) => {
            return AnimeItem({ index, data: item });
          })}
        </div>
      )}
    </div>
  );
}
