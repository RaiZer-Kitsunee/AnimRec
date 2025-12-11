"use client";
import { fetchSearchAnimeDataList } from "@/Service/fetch_data";
import { SearchIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import AnimeItem from "../components/anime_Item";

export default function Search() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedList, setSearchedList] = useState<Media[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setSearchedList([]);
    try {
      if (value === "") {
        return console.log("the filed is empty");
      }

      const response = await fetchSearchAnimeDataList({ query: value });

      if (response.success) {
        setSearchedList(response.data);
      }
    } catch (error) {
      console.log("error app" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center py-10 overflow-y-scroll">
      <div className="w-2/3 flex flex-col items-center gap-5">
        {/* search part  */}
        <h1 className="text-2xl text-black font-bold">Search For Something</h1>
        <div className="flex w-full gap-5">
          <input
            className="border-2 w-full pl-2 rounded-md h-10"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="w-10 h-10 cursor-pointer" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>

        {/* the data part */}
        {loading && (
          <div>
            <SparklesIcon size={40} className="animate-spin" />
          </div>
        )}
        {searchedList && (
          <div className="w-full grid grid-cols-5 gap-4">
            {searchedList.map((item, index) => {
              return AnimeItem({ index, data: item });
            })}
          </div>
        )}
      </div>
    </div>
  );
}
