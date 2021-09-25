import { AppBar, Button, Fab, TextField, Toolbar } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Add as AddIcon } from "@material-ui/icons";
import { addShoppingItem } from "../db/shopping";
import { useState } from "react";
import { CustomDialog } from "./CustomDialog";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const closeModal = () => setShowModal(false);
  const addItem = () => {
    addShoppingItem(name, "YlrlVIxOO7PvC3ffPkIY");
    setName("");
    closeModal();
  };
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <StyledFab
            onClick={() => setShowModal(true)}
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </StyledFab>
        </Toolbar>
      </AppBar>
      <CustomDialog
        action={
          <>
            <Button
              onClick={closeModal}
              size="small"
              color="primary"
              variant="outlined"
            >
              Fortryd
            </Button>
            <Button
              onClick={addItem}
              size="small"
              color="primary"
              variant="contained"
            >
              Tilføj
            </Button>
          </>
        }
        isOpen={showModal}
        onClose={closeModal}
      >
        <TextField
          autoFocus
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          margin="dense"
          id="shopping-item-name"
          label="Navn"
          fullWidth
          variant="standard"
        />
      </CustomDialog>
    </>
  );
};
