import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

// sign up
async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// sign out
function logout() {
  signOut(auth);
}

export { signInWithGoogle, logout };
