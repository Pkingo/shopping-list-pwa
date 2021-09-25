import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
  return (
    <CustomDialog isOpen={isOpen}>
      <Typography variant="h3">Vælg en liste</Typography>
      <List sx={{ maxHeight: "50%" }}>
        {collections.map((collection) => (
          <ListItem disablePadding key={collection.id}>
            <ListItemButton onClick={() => onSelect(collection)}>
              <ListItemText>{collection.data().name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CustomDialog>
  );
};
