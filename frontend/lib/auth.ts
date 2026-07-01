import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const BACKEND_URL = "http://localhost:5000/api/v1";

// User state ko backend database ke sath sync karne ka core function
export const syncUserWithBackend = async (user: User, provider = "email") => {
  try {
    const token = await user.getIdToken();
    const res = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: user.displayName || "DoFo User",
        email: user.email,
        photoURL: user.photoURL || "",
        provider,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to sync with backend database");
    }

    console.log("✅ Sync success:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Sync Error:", error.message);
    return { success: false, error: error.message };
  }
};

// Google se Sign In + Sync
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // User credentials sync karein
    const syncResult = await syncUserWithBackend(result.user, "google");
    if (!syncResult.success) {
      return { success: false, error: syncResult.error };
    }
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Google sign in failed";
    return { success: false, error: message };
  }
};

// Email + Password se Sign Up + Sync
export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Profile update karein
    await updateProfile(result.user, { displayName: fullName });
    
    // Refresh user state
    await result.user.reload();
    const updatedUser = auth.currentUser;

    if (updatedUser) {
      // Sync user details to backend
      const syncResult = await syncUserWithBackend(updatedUser, "email");
      if (!syncResult.success) {
        return { success: false, error: syncResult.error };
      }
    }
    
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Sign up failed";
    return { success: false, error: message };
  }
};

// Email + Password se Login + Sync
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Profile sync refresh on login
    await syncUserWithBackend(result.user);
    return { success: true, user: result.user };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Login failed";
    return { success: false, error: message };
  }
};

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Logout failed";
    return { success: false, error: message };
  }
};

// Auth state listener
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
