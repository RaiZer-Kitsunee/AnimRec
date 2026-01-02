"use client";

import { fetchSortedAnimeDataList } from "@/Service/fetch_data";
import {
  AddAnimeToFavoriteDB,
  DeleteAnimeFromUserFavoriteDB,
  GetAllUserFavoriteDB,
} from "@/Service/firebase_store";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./auth_context";

type MediaContextType = {
  items: Media[];
  favorites: Media[];
  loadItems: () => Promise<Media[]>;
  setItems: React.Dispatch<React.SetStateAction<Media[]>>;
  addFavorite: (item: Media) => void;
  removeFavorite: (itemId: number | string) => void;
  loadFavorite: () => Promise<Media[]>;
  setFavorites: React.Dispatch<React.SetStateAction<Media[]>>;
  loading: boolean;
  error: string | null;
};

const AnimeMediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export function AnimeMediaProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Media[]>([]);
  const [favorites, setFavorites] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  const addFavorite = async (item: Media) => {
    try {
      if (item) {
        console.log("user id" + user?.uid);
        await AddAnimeToFavoriteDB({
          userId: user ? user.uid : "there is no user",
          animeMedia: item,
        });
        console.log("add complete");
      } else {
        console.log("there is not item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (itemId: number | string) => {
    try {
      if (itemId) {
        await DeleteAnimeFromUserFavoriteDB({
          userId: String(user?.uid),
          animeId: String(itemId),
        });
        console.log("deleting complete");
      } else {
        console.log("there is itemid");
      }
    } catch (error) {
      console.error(error);
    }
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

  const loadFavorite = async (): Promise<Media[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await GetAllUserFavoriteDB({
        userId: user?.uid || "there is no id",
      });
      const data: Media[] = response.data; // replace with real source
      setFavorites(data);
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
        loadItems,
        favorites,
        addFavorite,
        removeFavorite,
        loadFavorite,
        setFavorites,
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
