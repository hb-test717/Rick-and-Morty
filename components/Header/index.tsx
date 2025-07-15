"use client";

import useUserDetails from "@/hooks/useUserDetails";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import UserDetailsModal from "../UserDetailsModal";

const Header = () => {
  const { userInfo, updateUserInfo } = useUserDetails()
  const { setOpen, open } = useDisclosure()

  const saveAndCloseModal = (data: typeof userInfo) => {
    updateUserInfo(data);
  };

  return (
    <header>
      <Box bg="gray.50" py={3} px={6} borderBottom="1px" borderColor="gray.200">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold">{userInfo.username}</Text>
            <Text fontSize="sm" color="gray.600">
              {userInfo.jobTitle}
            </Text>
          </Box>

          <Button onClick={() => setOpen(true)} colorScheme="blue" size="sm">
            Edit
          </Button>

          <UserDetailsModal
            open={open}
            userInfo={userInfo}
            updateUserInfo={saveAndCloseModal}
            onClose={() => { setOpen(false) }}
          />
        </Flex>
      </Box>
    </header >
  );
}

export default Header;
