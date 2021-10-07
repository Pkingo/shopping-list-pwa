import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useLongPress } from "use-long-press";
import { FC } from "react";
import { ShoppingDocument } from "../../types/ShoppingItem";
import { updateShoppingItem } from "../../db/shopping";
import { CheckBoxOutlineBlank } from "@material-ui/icons";

export const CheckListItem: FC<{
  shoppingDocument: ShoppingDocument;
  onLongClick: (item: ShoppingDocument) => void;
}> = ({ onLongClick, shoppingDocument }) => {
  const bind = useLongPress(() => onLongClick(shoppingDocument));
  const { name, isBought } = shoppingDocument.data();
  const labelId = `checkbox-list-label-${name}`;

  return (
    <ListItem disablePadding>
      <ListItemButton
        {...bind}
        onClick={() =>
          updateShoppingItem(shoppingDocument.id, { isBought: !isBought })
        }
        dense
      >
        <ListItemIcon>
          <Checkbox
            color="secondary"
            edge="start"
            checked={isBought}
            icon={<CheckBoxOutlineBlank color="secondary" />}
            tabIndex={-1}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  );
};
