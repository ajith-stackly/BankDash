import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import profileFallback from "../assets/images/profile.png";
const STORAGE_KEYS = {
  profile: "bankdash.profile",
  preferences: "bankdash.preferences"
};
export const DEFAULT_AVATAR = profileFallback;
const defaultProfile = {
  avatarUrl: DEFAULT_AVATAR,
  yourName: "Charlene Reed",
  userName: "Charlene Reed",
  email: "charlenereed@gmail.com",
  dateOfBirth: "1990-01-25",
  presentAddress: "San Jose, California, USA",
  permanentAddress: "San Jose, California, USA",
  city: "San Jose",
  postalCode: "45962",
  country: "USA"
};
const defaultPreferences = {
  currency: "USD",
  timeZone: "(GMT-12:00) International Date Line West",
  notifyDigitalCurrency: true,
  notifyMerchantOrder: false,
  notifyRecommendations: true
};
function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      ...parsed
    };
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage:`, err);
    return fallback;
  }
}
function saveToStorage(key, value) {
  if (typeof window === "undefined") return true;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`Could not persist "${key}" to localStorage:`, err);
    return false;
  }
}
const UserContext = createContext(null);
export function UserProvider({
  children
}) {
  const [profile, setProfileState] = useState(() => loadFromStorage(STORAGE_KEYS.profile, defaultProfile));
  const [preferences, setPreferencesState] = useState(() => loadFromStorage(STORAGE_KEYS.preferences, defaultPreferences));
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.profile, profile);
  }, [profile]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.preferences, preferences);
  }, [preferences]);
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === STORAGE_KEYS.profile) {
        setProfileState(loadFromStorage(STORAGE_KEYS.profile, defaultProfile));
      }
      if (e.key === STORAGE_KEYS.preferences) {
        setPreferencesState(loadFromStorage(STORAGE_KEYS.preferences, defaultPreferences));
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const updateProfile = useCallback(patchOrFn => {
    let ok = true;
    setProfileState(prev => {
      const next = typeof patchOrFn === "function" ? patchOrFn(prev) : {
        ...prev,
        ...patchOrFn
      };
      ok = saveToStorage(STORAGE_KEYS.profile, next);
      return next;
    });
    return ok;
  }, []);
  const updatePreferences = useCallback(patchOrFn => {
    let ok = true;
    setPreferencesState(prev => {
      const next = typeof patchOrFn === "function" ? patchOrFn(prev) : {
        ...prev,
        ...patchOrFn
      };
      ok = saveToStorage(STORAGE_KEYS.preferences, next);
      return next;
    });
    return ok;
  }, []);
  const updateAvatar = useCallback(avatarUrl => updateProfile(prev => ({
    ...prev,
    avatarUrl
  })), [updateProfile]);
  const resetProfile = useCallback(() => {
    setProfileState(defaultProfile);
    setPreferencesState(defaultPreferences);
  }, []);
  const value = {
    profile,
    preferences,
    updateProfile,
    updatePreferences,
    updateAvatar,
    resetProfile,
    defaultAvatar: DEFAULT_AVATAR
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser() must be used inside a <UserProvider>");
  }
  return ctx;
}
export default UserContext;
