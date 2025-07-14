"use client"

import { useState } from "react";

type Data = Record<string, string>

/**
 * Custom hook to manage user details.
 *
 * @remarks
 * This hook loads user details from local storage and provides functions to manage user details state
 * while syncing it with local storage
 *
 */
const useUserDetails = () => {
  const [userInfo, setUserInfo] = useState<Data>(userInfoFromLocalStorage);

  const updateUserInfo = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as Data;

    setUserInfoInLocalStorage(data)
    setUserInfo(data);
  };

  const hasRequiredData = !!userInfo.username?.trim() && !!userInfo.jobTitle?.trim();

  return {
    hasRequiredData,
    userInfo,
    updateUserInfo
  }
}

// Helper functions to store data in local storage.
const userInfoFromLocalStorage = (): Data => {
  try {
    const info = localStorage.getItem("userInfo") || "{}";
    return JSON.parse(info);
  } catch (err) {    // eslint-disable-line @typescript-eslint/no-unused-vars
    // [TODO] This would be recorded in error monitoring tool in production apps
    // Handling it gracefully in the UI
    return {};
  }
};

const setUserInfoInLocalStorage = (userInfo: Data) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
};

export default useUserDetails;
