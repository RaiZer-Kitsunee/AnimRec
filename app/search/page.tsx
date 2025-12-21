"use client";
import { fetchSearchAnimeDataList } from "@/Service/fetch_data";
import { SearchIcon, SparklesIcon, UserRoundSearch } from "lucide-react";
import { useEffect, useState } from "react";
import AnimeItem from "../components/anime_Item";

export default function Search() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedList, setSearchedList] = useState<Media[]>([]);
  const [listIsEmpty, setListIsEmpty] = useState(true);

  const handleSearch = async () => {
    setLoading(true);
    setSearchedList([]);
    try {
      if (value === "") {
        return console.log("the filed is empty");
      }

      const response = await fetchSearchAnimeDataList({ query: value });

      if (response.success) {
        setListIsEmpty(false);
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
      <div className="pl-40 pr-20 w-4/4 flex flex-col items-center gap-5">
        {/* search part  */}
        <div className="flex w-full gap-5">
          <input
            className="w-full border-2 border-gray-400 rounded-lg px-4 py-2 focus:border-2 focus:outline-none focus:border-gray-500"
            value={value}
            type="text"
            placeholder="ex: Dragon ball, Naruto"
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="w-10 h-10 cursor-pointer" onClick={handleSearch}>
            <SearchIcon className={"text-gray-600"} size={30} />
          </button>
        </div>

        {/* the data part */}
        {/* handle loading */}
        {loading && (
          <div className="w-full h-100 flex items-center justify-center">
            <SparklesIcon size={40} className="animate-spin" />
          </div>
        )}
        {/* handle empty list  */}
        {listIsEmpty && (
          <div className="w-full h-100 text-xl text-gray-500 font-bold flex flex-col items-center justify-center gap-5">
            <UserRoundSearch size={70} className="text-gray-500" />
            Search for something
          </div>
        )}
        {/* the list  */}
        {searchedList && (
          <div className={`w-full grid grid-cols-5 gap-4 p-5 z-10`}>
            {searchedList.map((item, index) => {
              return AnimeItem({ index, data: item });
            })}
          </div>
        )}
      </div>
    </div>
  );
}
