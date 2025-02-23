import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

interface LocationFilterProps {
  open: boolean;  
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

interface Location {
    _id: number;
    name: string;
  }


const ConfirmationModel: React.FC<LocationFilterProps> = ({ open, message, onConfirm, onClose }) => {
    return (<Dialog open={open} onClose={onClose}>
        <DialogTitle>{message} </DialogTitle>
        <DialogActions>
         <Button onClick={() => onConfirm()} color="success" variant="contained">Yes</Button>
          <Button onClick={onClose} color="warning" variant="contained">No</Button>
        </DialogActions>
      </Dialog>)
};

export default ConfirmationModel;
