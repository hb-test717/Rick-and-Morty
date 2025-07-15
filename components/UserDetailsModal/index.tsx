"use client"

import { Button, Field, Input, Stack } from "@chakra-ui/react"
import useUserDetails from "@/hooks/useUserDetails";
import Modal from "@/components/shared/Modal";

type UserDetailsModalProps = {
  userInfo: ReturnType<typeof useUserDetails>["userInfo"],
  updateUserInfo: ReturnType<typeof useUserDetails>["updateUserInfo"],
  open: boolean
  onClose?: () => void
};

/*
 * UserDetailsModal is a reusable component for displaying and updating user details.
 * This is used to get user details and the controls can be controlled
 */
const UserDetailsModal = ({ userInfo, updateUserInfo, open, onClose }: UserDetailsModalProps) => {
  const updateDetails = (formData: FormData) => {
    const userData = Object.fromEntries(formData) as Record<string, string>;
    updateUserInfo(userData);

    // Close the modal after submission if onClose handler is provided
    onClose?.();
  }

  return (
    <Modal
      title="Please enter your details"
      footer={
        <Button variant="solid" size="md" type="submit" form="user-details-form">Save and continue</Button>
      }
      onClose={onClose}
      open={open}
    >
      <form action={updateDetails} role="form" id="user-details-form">
        <Stack gap="8">
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input name="username" placeholder="Username" defaultValue={userInfo?.username || ""} required />
          </Field.Root>
          <Field.Root>
            <Field.Label>Job Title</Field.Label>
            <Input name="jobTitle" placeholder="Job Title" defaultValue={userInfo?.jobTitle || ""} required />
          </Field.Root>
        </Stack>
      </form>
    </Modal>
  )
}

export default UserDetailsModal;
