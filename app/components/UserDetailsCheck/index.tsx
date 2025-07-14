"use client"

import useUserDetails from '@/app/hooks/useUserDetails';
import UserDetailsModal from '@/app/components/UserDetailsModal';
import dynamic from 'next/dynamic';

const UserDetailsCheck = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, updateUserInfo, hasRequiredData } = useUserDetails()

  return (
    <>
      <UserDetailsModal
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
