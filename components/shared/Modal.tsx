"use client"

import { Button, CloseButton, Dialog, DialogFooter, DialogOpenChangeDetails, Portal } from "@chakra-ui/react"
import React, { ReactNode } from "react";

/*
* A basic reusable modal component.
*/
type ModalProps = {
  open: boolean
  title: string | ReactNode,
  children: React.ReactNode,
  footer?: React.ReactNode,
  onClose?: () => void
};

const Modal = ({ title, children, footer, open, onClose }: ModalProps) => {
  const canCloseModal = !!onClose

  // Allow modal to be closed with Esc or click-out of the modal
  // if onClick handler is provided
  const onOpenChange = (details: DialogOpenChangeDetails) => {
    if (!details.open && canCloseModal) {
      onClose();
    }
  };

  return (
    <Dialog.Root size="lg" placement="center" onOpenChange={onOpenChange} open={open} closeOnEscape={canCloseModal} closeOnInteractOutside={canCloseModal}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {children}
            </Dialog.Body>
            <DialogFooter>
              {footer}
              {
                canCloseModal && (
                  <>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
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

export default Modal;
