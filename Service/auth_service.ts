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
function logout() {
  signOut(auth);
}

export { signInWithGoogle, logout };
