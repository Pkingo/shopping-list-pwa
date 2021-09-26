import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@material-ui/core";
import { List as ListIcon, Add as AddIcon } from "@material-ui/icons";
import { FormEvent } from "react";
import { useCollections } from "../contexts/Collections";
import { addCollection } from "../db/collection";
import { CustomDialog } from "./CustomDialog";
import { SectionHeader } from "./SectionHeader";

export const CollectionModal = () => {
  const { hasSelectedCollection, selectCollection, collections } =
    useCollections();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = event.currentTarget["new-list-name"].value;
    const doc = await addCollection(name);
    selectCollection(doc.id);
  };
  return (
    <CustomDialog isOpen={!hasSelectedCollection}>
      <nav>
        <SectionHeader noMarginBottom Icon={ListIcon} title="Vælg en liste" />
        <List>
          {Array.from(collections).map(([id, collection]) => (
            <ListItem disablePadding key={id}>
              <ListItemButton onClick={() => selectCollection(id)}>
                <ListItemText>{collection.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" sx={{ marginTop: 2 }}>
          <SectionHeader noMarginBottom Icon={AddIcon} title="Opret ny liste" />
          <TextField
            id="new-list-name"
            size="small"
            fullWidth
            margin="dense"
            variant="standard"
          />
          <Button
            sx={{ marginLeft: "auto" }}
            color="primary"
            type="submit"
            variant="contained"
            size="small"
          >
            Opret liste
          </Button>
        </Stack>
      </form>
    </CustomDialog>
  );
};
