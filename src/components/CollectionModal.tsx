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
import { useCollections } from "../contexts/Collections";
import { CustomDialog } from "./CustomDialog";

export const CollectionModal = () => {
  const { selectedCollection, selectCollection, collections } =
    useCollections();
  const createNewList = (event: any) => {
    console.log({ event });
  };
  return (
    <CustomDialog isOpen={!selectedCollection}>
      <nav>
        <Typography variant="h3">Vælg en liste</Typography>
        <List>
          {collections.map((collection) => (
            <ListItem disablePadding key={collection.id}>
              <ListItemButton onClick={() => selectCollection(collection.id)}>
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
