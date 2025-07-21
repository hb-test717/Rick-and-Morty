"use client"

import { useState } from "react";
import { Button, Field, Input, Stack, Text } from "@chakra-ui/react"
import useUserDetails from "@/hooks/useUserDetails";
import Modal from "@/components/shared/Modal";
import Alert from "@/components/shared/Alert";

type UserDetailsModalProps = {
  title?: string;
  userInfo: ReturnType<typeof useUserDetails>["userInfo"],
  updateUserInfo: ReturnType<typeof useUserDetails>["updateUserInfo"],
  open: boolean
  onClose?: () => void
};

/*
 * A reusable component for displaying and updating user details.
 * The component has validation logic to ensure user details are valid.
 *
 * If onClose params aren't provided, Close and Cancel buttons are hidden and
 * the modal cannot be closed by the user. This is useful when the parent component
 * wants to control the modal's lifecycle.
 */
const UserDetailsModal = ({ title, userInfo, updateUserInfo, open, onClose, }: UserDetailsModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Validate form fields and sets appropriate error message when invalid
   *
   * @param fields JSON object of the form fields
   * @returns Boolean value indicating whether the form fields are valid
   */
  const validateFormFields = ({ username, jobTitle }: Record<string, string>) => {
    if (username.trim() === "") {
      setErrorMessage("Please enter a valid username. Username must contain at least one non-whitespace character.");
      return false;
    }
    if (jobTitle.trim() === "") {
      setErrorMessage("Please enter your job title. Job title must contain at least one non-whitespace character.");
      return false;
    }

    // If both fields are valid, set error message to null and return true
    setErrorMessage(null);
    return true;
  }

  /**
   * Validates the input and updates user details.
   * Upon updating, it closes the modal if onClose handler is provided
   *
   * @param formData Form data containing user details
   */
  const updateDetails = (formData: FormData) => {
    const userData = Object.fromEntries(formData) as Record<string, string>;
    if (validateFormFields(userData)) {
      updateUserInfo(userData);
      // Close the modal after submission if onClose handler is provided
      onClose?.();
    }
  }

  return (
    <Modal
      title="Your profile"
      footer={
        <Button variant="solid" size="md" type="submit" form="user-details-form">Save and continue</Button>
      }
      onClose={onClose}
      open={open}
    >
      <form action={updateDetails} role="form" id="user-details-form">
        <Stack gap="8">
          {!!errorMessage && (<Alert>{errorMessage}</Alert>)}
          {title && <Text fontSize="md">{title}</Text>}
          <Field.Root>
            <Field.Label fontSize="md">Username</Field.Label>
            <Input
              name="username"
              placeholder="Username"
              defaultValue={userInfo?.username || ""}
              required
              size={{ base: 'sm', md: 'md' }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="md">Job Title</Field.Label>
            <Input
              name="jobTitle"
              placeholder="Job Title"
              defaultValue={userInfo?.jobTitle || ""}
              required
              size={{ base: 'sm', md: 'md' }}
            />
          </Field.Root>
        </Stack >
      </form >
    </Modal >
  )
}

export default UserDetailsModal;
