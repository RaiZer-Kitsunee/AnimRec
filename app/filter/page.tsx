"use client";

import AnimeItem from "@/components/custom/anime_Item";
import { CustomSelect } from "@/components/custom/customSelect";
import { Button } from "@/components/ui/button";
import { useAnimeMedia } from "@/contexts/anime_context";
import { ShipWheel } from "lucide-react";
import { useEffect, useState } from "react";

export default function FilterPage() {
  const { filters, loading, loadFilters } = useAnimeMedia();
  const [isYear, setIsYear] = useState<string>("2025");
  const [isGenre, setIsGenre] = useState<string>("Action");

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Slice of Life",
    "Fantasy",
    "Supernatural",
    "Magic",
    "Romance",
    "Horror",
    "Mystery",
    "Psychological",
    "Sci-Fi",
    "Thriller",
    "Sports",
    "Ecchi",
    "Mecha",
    "Isekai",
    "Magical Girl",
    "Harem",
    "Reverse Harem",
    "School",
    "Super Power",
    "Military",
    "Historical",
    "Music",
    "Gore",
    "Survival",
    "Boys Love",
    "Girls Love",
    "Shounen",
    "Shoujo",
    "Seinen",
    "Josei",
    "Kids",
  ];

  const years = Array.from({ length: 2026 - 1988 + 1 }, (_, i) => 2026 - i);

  const getAnimeList = async ({
    year,
    genre,
  }: {
    year: number;
    genre: string;
  }) => {
    try {
      loadFilters({ year, genre });
    } catch (error) {
      console.log("error in the main is" + error);
    }
  };

  useEffect(() => {
    getAnimeList({ year: 2020, genre: "action" });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-scroll pl-14 py-10 pr-2">
      <div className="w-full h-full flex items-start gap-5 mb-2">
        <CustomSelect
          list={genres}
          filter={isGenre}
          setFilters={setIsGenre}
          placeholder="Genres"
        />
        <CustomSelect
          list={years}
          filter={isYear}
          setFilters={setIsYear}
          placeholder="Years"
        />
        <Button
          className="w-25"
          onClick={() => getAnimeList({ year: Number(isYear), genre: isGenre })}
        >
          Filter
        </Button>
      </div>
      {loading || filters.length === 0 ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <ShipWheel size={50} className="animate-spin" />
        </div>
      ) : (
        filters && (
          <div className="w-full grid grid-cols-7 gap-4 z-10">
            {filters.map((item, index) => {
              return AnimeItem({ index, data: item });
            })}
          </div>
        )
      )}
    </div>
  );
}
