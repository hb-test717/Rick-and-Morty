"use client"

import { Button, CloseButton, Dialog, DialogFooter, Portal } from "@chakra-ui/react"
import React, { ReactNode } from "react";

/*
* A basic reusable modal component.
*/
type ModalProps = {
  title: string | ReactNode,
  children: React.ReactNode,
  footer: React.ReactNode,
  open: boolean
  onClose?: () => void
};

const Modal = ({ title, children, footer, open, onClose }: ModalProps) => {
  return (
    <Dialog.Root size="lg" placement="center" open={open}>
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

export default Modal;
