// favorite

import { db } from "@/lib/firebase";
import CustomResponse from "@/Types/response_type";
import {
  MISSING_REQUIREMENT,
  TASK_COMPLETE,
  TASK_FAILED,
  UNKNOWN_ERROR,
} from "@/Utility/error_message";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

// add anime to favorite of the current user
async function AddAnimeToFavoriteDB({
  userId,
  animeMedia,
}: {
  userId: string | undefined;
  animeMedia: Media;
}): Promise<CustomResponse> {
  if (!userId || !animeMedia) return MISSING_REQUIREMENT;

  try {
    const userDoc = doc(collection(db, "users"), userId);
    const favoriteDoc = doc(
      collection(userDoc, "favorites"),
      String(animeMedia.id)
    );

    if (favoriteDoc) {
      console.log("i found the favorite doc" + userId);
      await setDoc(favoriteDoc, animeMedia);
      console.log("adn finish setting the fav anime");
    }

    return TASK_COMPLETE(animeMedia);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// remove anime from favorite form the current user
async function DeleteAnimeFromUserFavoriteDB({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}): Promise<CustomResponse> {
  if (!userId || !animeId) return MISSING_REQUIREMENT;

  try {
    const userDoc = doc(collection(db, "users"), userId);
    const favoriteDoc = doc(collection(userDoc, "favorites"), animeId);
    if (favoriteDoc) {
      await deleteDoc(favoriteDoc);
    }
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// get all favorite of the current user
async function GetAllUserFavoriteDB({
  userId,
}: {
  userId: string;
}): Promise<CustomResponse> {
  if (!userId) return MISSING_REQUIREMENT;

  try {
    const favoriteCol = collection(db, "users", userId, "favorites");

    const querySnapshot = await getDocs(favoriteCol);

    const favorites = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return TASK_COMPLETE(favorites);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// wishlist

// add anime to wishlist of the current user

// remove anime from wishlist from the current user

// get all wishlist of the current user

export {
  AddAnimeToFavoriteDB,
  DeleteAnimeFromUserFavoriteDB,
  GetAllUserFavoriteDB,
};
