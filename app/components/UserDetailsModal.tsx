"use client"

import { Button, CloseButton, Dialog, DialogFooter, Field, Input, Portal, Stack } from "@chakra-ui/react"
import useUserDetails from "../hooks/useUserDetails";

type Props = {
  userInfo: ReturnType<typeof useUserDetails>["userInfo"],
  updateUserInfo: ReturnType<typeof useUserDetails>["updateUserInfo"],
  open: boolean
  onClose?: () => void
};

const UserDetailsModal = ({ userInfo, updateUserInfo, open, onClose }: Props) => {
  const updateDetails = (formData: FormData) => {
    const userData = Object.fromEntries(formData) as Record<string, string>;
    updateUserInfo(userData);

    // Close the modal after submission if onClose handler is provided
    onClose?.();
  }

  return (
    <Dialog.Root size="lg" placement="center" open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Please enter your details</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
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
            </Dialog.Body>
            <DialogFooter>
              <Button variant="solid" size="md" type="submit" form="user-details-form">Save and continue</Button>
              {
                onClose && (
                  <>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton onClick={onClose} size="sm" />
                    </Dialog.CloseTrigger>
                  </>
                )
              }
            </DialogFooter>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default UserDetailsModal;
