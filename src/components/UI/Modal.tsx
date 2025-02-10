import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: "form" | "confirmation"; // Define modal types
};

const Modal = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "confirmation",
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        {type === "confirmation" && (
          <Button onClick={onConfirm} variant='contained' color='primary'>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
