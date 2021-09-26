import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { subscribeToCollectionDocuments } from "../db/collection";
import { CollectionDocument } from "../types/Collection";
import { CustomDialog } from "./CustomDialog";

export const CollectionModal = ({
  isOpen,
  onSelect,
}: {
  isOpen: boolean;
  onSelect: (collection: CollectionDocument) => void;
}) => {
  const [collections, setCollections] = useState<CollectionDocument[]>([]);
  useEffect(() => {
    return subscribeToCollectionDocuments(setCollections);
  }, []);
  const createNewList = (event: any) => {
    console.log({ event });
  };
  return (
    <CustomDialog isOpen={isOpen}>
      <nav>
        <Typography variant="h3">Vælg en liste</Typography>
        <List>
          {collections.map((collection) => (
            <ListItem disablePadding key={collection.id}>
              <ListItemButton onClick={() => onSelect(collection)}>
                <ListItemText>{collection.data().name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />
      <Stack direction="column" sx={{ marginTop: 2 }}>
        <Typography variant="overline">Opret ny liste</Typography>
        <TextField
          id="new-list-name"
          size="small"
          fullWidth
          margin="dense"
          variant="standard"
        />
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={createNewList}
          color="primary"
          variant="contained"
          size="small"
        >
          Opret liste
        </Button>
      </Stack>
    </CustomDialog>
  );
};
