import { Button, TextField, Stack } from "@material-ui/core";
import {
  Delete as DeleteIcon,
  DriveFileRenameOutline,
} from "@material-ui/icons";
import { useCollection } from "../contexts/CollectionSelector";
import { CustomDialog } from "./CustomDialog";

export const SettingsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { collection } = useCollection();
  const name = collection?.data().name || "";
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Indstillinger for ${name}`}
    >
      <Stack gap={2}>
        <Stack
          direction="row"
          gap={1}
          alignItems="baseline"
          justifyContent="space-between"
        >
          <TextField
            autoFocus
            margin="dense"
            label="Liste navn"
            defaultValue={name}
            variant="standard"
          />
          <Button
            sx={{ height: "max-content" }}
            size="small"
            variant="contained"
            startIcon={<DriveFileRenameOutline />}
            color="primary"
          >
            Omdøb
          </Button>
        </Stack>
        <Button color="warning" variant="outlined" startIcon={<DeleteIcon />}>
          Slet
        </Button>
      </Stack>
    </CustomDialog>
  );
};
