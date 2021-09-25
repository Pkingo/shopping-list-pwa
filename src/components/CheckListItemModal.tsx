import {
  Button,
  InputAdornment,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { FC, useEffect, useState } from "react";
import { deleteShoppingItem, updateShoppingItem } from "../db/shopping";
import { ShoppingDocument } from "../types/ShoppingItem";
import { CustomDialog } from "./CustomDialog";

export const CheckListItemModal: FC<{
  selectedDoc: ShoppingDocument | null;
  closeModal: () => void;
  isOpen: boolean;
}> = ({ selectedDoc, closeModal, isOpen }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(selectedDoc?.data().name || "");
  }, [selectedDoc]);
  if (!selectedDoc) {
    return null;
  }
  const saveItem = async () => {
    updateShoppingItem(selectedDoc.id, { name });
    closeModal();
  };
  const deleteItem = () => {
    deleteShoppingItem(selectedDoc.id);
    closeModal();
  };
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={closeModal}
      action={
        <>
          <Button onClick={closeModal} variant="outlined" color="primary">
            Fotryd
          </Button>
          <Button onClick={saveItem} variant="contained" color="primary">
            Gem
          </Button>
        </>
      }
    >
      <TextField
        autoFocus
        margin="dense"
        id="shopping-item-name"
        label="Navn"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        fullWidth
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={deleteItem} color="error">
                <DeleteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </CustomDialog>
  );
};
