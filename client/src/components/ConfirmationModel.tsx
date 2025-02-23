import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface LocationFilterProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModel: React.FC<LocationFilterProps> = ({
  open,
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{message} </DialogTitle>
      <DialogActions>
        <Button onClick={() => onConfirm()} color="success" variant="contained">
          Yes
        </Button>
        <Button onClick={onClose} color="warning" variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModel;
