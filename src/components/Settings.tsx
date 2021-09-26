import { Button, TextField, Stack } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { FormEvent } from "react";
import { useCollections } from "../contexts/Collections";
import { deleteCollection, updateCollection } from "../db/collection";
import { CustomDialog } from "./CustomDialog";
import { SectionHeader } from "./SectionHeader";

export const SettingsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { selectedCollection, selectedCollectionId } = useCollections();
  const name = selectedCollection?.name || "";
  const onRenameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = event.currentTarget["rename"].value;
    if (!value || value === name) {
      return;
    }
    updateCollection(selectedCollectionId, { name: value });
    onClose();
  };
  const handleOnDelete = () => {
    deleteCollection(selectedCollectionId);
    onClose();
  };
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Indstillinger for ${name}`}
    >
      <Stack gap={2}>
        <form onSubmit={onRenameSubmit}>
          <Stack>
            <SectionHeader noMarginBottom Icon={EditIcon} title="Liste navn" />
            <TextField
              id="rename"
              autoFocus
              margin="none"
              defaultValue={name}
              variant="standard"
            />
            <Button
              sx={{ mt: 2 }}
              size="small"
              variant="contained"
              color="primary"
              type="submit"
            >
              Omdøb
            </Button>
          </Stack>
        </form>
        <Stack>
          <SectionHeader Icon={DeleteIcon} title="Slet liste" />
          <Button onClick={handleOnDelete} color="error" variant="outlined">
            Slet
          </Button>
        </Stack>
      </Stack>
    </CustomDialog>
  );
};
