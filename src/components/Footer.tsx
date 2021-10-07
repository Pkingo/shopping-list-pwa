import {
  AppBar,
  Button,
  DialogActions,
  Fab,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  DeleteSweep as DeleteIcon,
} from "@material-ui/icons";
import { addShoppingItem, deleteIsBoughtItems } from "../db/shopping";
import { FormEvent, useState } from "react";
import { CustomDialog } from "./CustomDialog";
import { useCollections } from "../contexts/Collections";
import { RecipeScraperMenuItem } from "./recipeScraper";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const { selectedCollectionId } = useCollections();
  const closeModal = () => setShowModal(false);
  const onDeleteBoughtItems = () => {
    deleteIsBoughtItems(selectedCollectionId);
    setAnchorEl(null);
  };
  const handleNewListSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listName = event.currentTarget["shopping-item-name"].value;
    if (!selectedCollectionId || !listName.length) {
      return;
    }
    addShoppingItem(listName, selectedCollectionId);
    closeModal();
  };
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{ flexDirection: "column", justifyContent: "center" }}>
          <StyledFab
            onClick={() => setShowModal(true)}
            color="secondary"
            aria-label="add"
          >
            <AddIcon color="info" />
          </StyledFab>
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ alignSelf: "end" }}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={onDeleteBoughtItems}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Slet indkøbte ting</ListItemText>
            </MenuItem>
            <RecipeScraperMenuItem onOpen={() => setAnchorEl(null)} />
          </Menu>
        </Toolbar>
      </AppBar>
      <CustomDialog isOpen={showModal} onClose={closeModal}>
        <form onSubmit={handleNewListSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="shopping-item-name"
            label="Navn"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button
              onClick={closeModal}
              size="small"
              color="primary"
              variant="outlined"
            >
              Fortryd
            </Button>
            <Button
              size="small"
              color="primary"
              type="submit"
              variant="contained"
            >
              Tilføj
            </Button>
          </DialogActions>
        </form>
      </CustomDialog>
    </>
  );
};
