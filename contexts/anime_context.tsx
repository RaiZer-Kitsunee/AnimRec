"use client";

import {
  fetchAnimeIdsData,
  fetchGenresAnimeDataList,
  fetchSortedAnimeDataList,
} from "@/Service/fetch_data";
import {
  AddAnimeToFavoriteDB,
  AddAnimeToWishlistDB,
  DeleteAnimeFromUserFavoriteDB,
  DeleteAnimeFromUserWishlistDB,
  GetAllUserFavoriteDB,
  GetAllUserWishlistDB,
} from "@/Service/firebase_store";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./auth_context";
import { number } from "motion/react";

type MediaContextType = {
  items: Media[];
  loadItems: () => Promise<Media[]>;
  setItems: React.Dispatch<React.SetStateAction<Media[]>>;
  favorites: Media[];
  addFavorite: (item: Media) => void;
  removeFavorite: (itemId: number | string) => void;
  loadFavorite: () => Promise<Media[]>;
  setFavorites: React.Dispatch<React.SetStateAction<Media[]>>;
  wishlists: Media[];
  addWishlist: (item: Media) => void;
  removeWishlist: (itemId: number | string) => void;
  loadWishlist: () => Promise<Media[]>;
  setWishlists: React.Dispatch<React.SetStateAction<Media[]>>;
  filters: Media[];
  loadFilters: ({
    year,
    genre,
  }: {
    year: number;
    genre: string;
  }) => Promise<Media[]>;
  setFilters: React.Dispatch<React.SetStateAction<Media[]>>;
  loading: boolean;
  error: string | null;
};

const AnimeMediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export function AnimeMediaProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Media[]>([]);
  const [favorites, setFavorites] = useState<Media[]>([]);
  const [wishlists, setWishlists] = useState<Media[]>([]);
  const [filters, setFilters] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  const addFavorite = async (item: Media) => {
    try {
      if (item) {
        console.log("user id" + user?.uid);
        await AddAnimeToFavoriteDB({
          userId: user ? user.uid : "there is no user",
          animeId: String(item.id),
          animeName: item.title.english || "Null",
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

  const loadFavorite = async (): Promise<Media[]> => {
    setLoading(true);
    setError(null);

    try {
      const res = await GetAllUserFavoriteDB({
        userId: user?.uid || "there is no id",
      });
      const animeList = res.data.map((item: { id: number }) => item.id);
      const response = await fetchAnimeIdsData({ anime_ids: animeList });
      const data: Media[] = response.data; // replace with real source
      setFavorites(data);
      return data;
    } catch (err) {
      setError("Failed to load items" + err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addWishlist = async (item: Media) => {
    try {
      if (item) {
        await AddAnimeToWishlistDB({
          userId: user ? user?.uid : "no id",
          animeId: String(item.id),
          animeName: item.title.english || "Null",
        });
      } else {
        console.log("there is no item");
      }
    } catch (error) {
      console.error("error " + error);
    }
  };

  const removeWishlist = async (itemId: number | string) => {
    try {
      if (itemId) {
        await DeleteAnimeFromUserWishlistDB({
          userId: user ? user?.uid : "no id",
          animeId: String(itemId),
        });
      } else {
        console.log("deleted complete");
      }
    } catch (error) {
      console.error("error: " + error);
    }
  };

  const loadWishlist = async (): Promise<Media[]> => {
    setLoading(true);
    setError(null);

    try {
      const res = await GetAllUserWishlistDB({
        userId: user ? user.uid : "no id",
      });
      const animeList = res.data.map((item: { id: number }) => item.id);
      const response = await fetchAnimeIdsData({ anime_ids: animeList });
      const data: Media[] = response.data;
      setWishlists(data);
      return data;
    } catch (error) {
      setError("Failed to load items" + error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async ({
    year,
    genre,
  }: {
    year: number;
    genre: string;
  }): Promise<Media[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchGenresAnimeDataList({ year, genre });
      const data: Media[] = response.data;
      setFilters(data);
      return data;
    } catch (error) {
      setError("Failed to load items" + error);
      return [];
    } finally {
      setLoading(false);
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
      setError("Failed to load items" + err);
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
        wishlists,
        addWishlist,
        removeWishlist,
        loadWishlist,
        setWishlists,
        filters,
        loadFilters,
        setFilters,
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
