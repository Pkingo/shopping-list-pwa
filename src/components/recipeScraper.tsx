import {
  Button,
  DialogActions,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Download as DownloadIcon } from "@material-ui/icons";
import { useMachine } from "@xstate/react";
import { FormEvent } from "react";
import { scraperMachine } from "../machines/scraperMachine";
import { CustomDialog } from "./CustomDialog";
import { CheckBoxOutlineBlank } from "@material-ui/icons";
import { useCollections } from "../contexts/Collections";

type RecipeScraperProps = {
  onOpen: () => void;
};

export const RecipeScraperMenuItem = ({ onOpen }: RecipeScraperProps) => {
  const { selectedCollectionId } = useCollections();
  const [state, send] = useMachine(scraperMachine, {
    actions: { onOpen },
    context: { collectionId: selectedCollectionId },
  });
  const isOpen = state.matches("opened");
  const isLoading =
    state.matches("opened.fetching") || state.matches("opened.addingItems");
  const isUrlForm = state.matches("opened.url");
  const isCheckList = state.matches("opened.checkList");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(event);
  };

  return (
    <>
      <MenuItem onClick={() => send("OPEN")}>
        <ListItemIcon>
          <DownloadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Hent opskrift fra Valdemarsro.dk</ListItemText>
      </MenuItem>
      <CustomDialog
        isOpen={isOpen}
        onClose={() => send("CLOSE")}
        title="Hent opskrift fra Valdemarsro.dk"
      >
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <CircularProgress />
          ) : isUrlForm ? (
            <URLForm error={state.context.error} />
          ) : isCheckList ? (
            <CheckList items={state.context.items} />
          ) : null}
          <DialogActions>
            <Button
              onClick={() => send("CLOSE")}
              size="small"
              color="primary"
              variant="outlined"
            >
              Fortryd
            </Button>
            <Button
              disabled={isLoading}
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

const URLForm = ({ error }: { error?: string }) => (
  <TextField
    error={!!error}
    helperText={error}
    autoFocus
    margin="dense"
    id="valdemarsro-url"
    label="Link to opskrift"
    fullWidth
    variant="standard"
  />
);

const CheckList = ({ items }: { items: string[] }) => (
  <FormGroup>
    {items.map((item) => (
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlank color="secondary" />}
            color="secondary"
            value={item}
            aria-label={item}
            defaultChecked
          />
        }
        label={item}
      />
    ))}
  </FormGroup>
);
