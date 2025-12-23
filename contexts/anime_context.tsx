"use client";

import { fetchSortedAnimeDataList } from "@/Service/fetch_data";
import React, { createContext, useContext, useState, ReactNode } from "react";

type MediaContextType = {
  items: Media[];
  addItem: (item: Media) => void;
  loadItems: () => Promise<Media[]>;
  setItems: React.Dispatch<React.SetStateAction<Media[]>>;
  loading: boolean;
  error: string | null;
};

const AnimeMediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export function AnimeMediaProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = (item: Media) => {
    setItems((prev) => [...prev, item]);
  };

  const loadItems = async (): Promise<Media[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchSortedAnimeDataList("TRENDING_DESC");
      const data: Media[] = response.data; // replace with real source
      setItems(data);
      return data;
    } catch (err) {
      setError("Failed to load items");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimeMediaContext.Provider
      value={{
        items,
        setItems,
        addItem,
        loadItems,
        loading,
        error,
      }}
    >
      {children}
    </AnimeMediaContext.Provider>
  );
}

export const useAnimeMedia = () => {
  const ctx = useContext(AnimeMediaContext);
  if (!ctx) {
    throw new Error("useAnimeMedia must be used inside AnimeMediaProvider");
  }
  return ctx;
};
