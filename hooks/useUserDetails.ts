"use client"

import { useState } from "react";

type UserDetails = Record<string, string>

/**
 * Custom hook to manage user details.
 *
 * This hook loads user details from local storage and provides functions
 * to manage user details state while syncing it with local storage
 *
 * @returns Object containing user info state and utility functions
 *
 */
const useUserDetails = () => {
  const [userInfo, setUserInfo] = useState<UserDetails>(userInfoFromLocalStorage);

  /* Update user info in both state and LocalStorage */
  const updateUserInfo = (data: UserDetails) => {
    setUserInfoInLocalStorage(data)
    setUserInfo(data);
  };

  const hasRequiredData = Boolean(userInfo.username?.trim() && userInfo.jobTitle?.trim());

  return {
    hasRequiredData,
    userInfo,
    updateUserInfo
  }
}

/**
 * Retrieves user information from localStorage with error handling
 * Returns an empty object if data is not found or invalid
 *
 * @returns User details or empty object
 */
const userInfoFromLocalStorage = (): UserDetails => {
  try {
    const info = localStorage.getItem("userInfo") || "{}";
    return JSON.parse(info);
  } catch {
    // [TODO] This would be recorded in error monitoring tool in production apps
    return {};
  }
};

const setUserInfoInLocalStorage = (userInfo: UserDetails) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
};

export default useUserDetails;
