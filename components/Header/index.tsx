"use client";

import useUserDetails from "@/hooks/useUserDetails";
import { Box, Button, Flex, Text, useDisclosure, Container } from "@chakra-ui/react";
import UserDetailsModal from "../UserDetailsModal";

const Header = () => {
  const { userInfo, updateUserInfo } = useUserDetails()
  const { setOpen, open } = useDisclosure()

  const saveAndCloseModal = (data: typeof userInfo) => {
    updateUserInfo(data);
  };

  return (
    <Box as="header" position="sticky" top={0} zIndex="sticky" bg="gray.100" py={3} borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" flexWrap={{ base: "wrap", sm: "nowrap" }} gap={2}>
          <Box>
            <Text fontWeight="bold">{userInfo.username}</Text>
            <Text color="gray.600">
              {userInfo.jobTitle}
            </Text>
          </Box>

          <Button onClick={() => setOpen(true)} colorScheme="blue" size="sm" w={{ base: "1/2", sm: "auto" }}>
            Edit profile
          </Button>

          <UserDetailsModal
            open={open}
            userInfo={userInfo}
            updateUserInfo={saveAndCloseModal}
            onClose={() => { setOpen(false) }}
          />
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
