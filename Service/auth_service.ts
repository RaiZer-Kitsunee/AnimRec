/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// sign up
async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  try {
    const userDoc = doc(db, "users", user.uid);

    await setDoc(userDoc, {
      email: user.email,
      displayName: user.displayName,
      createAt: Timestamp.now(),
    });
  } catch (error) {
    console.error(error);
  }

  return result.user;
}

// sign out
const logout = async () => {
  try {
    const user = auth.currentUser;

    await signOut(auth);

    // Revoke Google access token if signed in with Google
    if (user?.providerData.some((p) => p?.providerId === "google.com")) {
      // This revokes the token on Google's side
      await fetch(
        "https://accounts.google.com/o/oauth2/revoke?token=" +
          (user as any).accessToken
      ); // accessToken is available right after login, but not always persisted
    }

    console.log("Signed out and Google access revoked");
  } catch (error) {
    console.error("Error:", error);
  }
};

export { signInWithGoogle, logout };
