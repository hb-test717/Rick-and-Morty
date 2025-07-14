"use client"

import { Button, Dialog, DialogFooter, Field, Input, Portal, Stack } from "@chakra-ui/react"
import useUserDetails from "../hooks/useUserDetails";

type Props = {
  userInfo: ReturnType<typeof useUserDetails>["userInfo"],
  updateUserInfo: ReturnType<typeof useUserDetails>["updateUserInfo"],
  open: boolean
};

const UserDetailsModal = ({ userInfo, updateUserInfo, open }: Props) => (
  <Dialog.Root size="lg" placement="center" open={open}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Please enter your details</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form action={updateUserInfo} role="form" id="user-details-form">
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
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)

export default UserDetailsModal;
