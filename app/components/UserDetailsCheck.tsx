"use client"

import useUserDetails from '@/hooks/useUserDetails';
import UserDetailsModal from '@/components/UserDetailsModal';
import dynamic from 'next/dynamic';

/**
 * Block children component from rendering until the User details are provided to the user.
 */
const UserDetailsCheck = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, updateUserInfo, hasRequiredData } = useUserDetails()

  return (
    <>
      <UserDetailsModal
        title="Welcome to Rick and Morty. Please provide a username and your job title to explore the world of Rick and Morty."
        open={!hasRequiredData}
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
      />
      {hasRequiredData && children}
    </>
  )
};

// We need to check localStorage for user details and that needs to be done on client side
// Using next/dynamic with ssr: false to always render this on client side
export default dynamic(() => Promise.resolve(UserDetailsCheck), {
  ssr: false,
});
