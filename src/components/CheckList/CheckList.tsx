import { List } from "@material-ui/core";
import { useState } from "react";
import { useShopping } from "../../contexts/shoppingContext";
import { ShoppingDocument } from "../../types/ShoppingItem";
import { CheckListItemModal } from "../CheckListItemModal";
import { CheckListItem } from "./CheckListItem";

export const CheckList = () => {
  const { documents } = useShopping();
  const [selectedDoc, setSelectorDoc] = useState<ShoppingDocument | null>(null);
  const isOpen = Boolean(selectedDoc);

  const closeModal = () => setSelectorDoc(null);
  const openModal = (doc: ShoppingDocument) => setSelectorDoc(doc);

  return (
    <>
      <List>
        {documents.map((document) => (
          <>
            <CheckListItem
              shoppingDocument={document}
              onLongClick={openModal}
            />
          </>
        ))}
      </List>
      <CheckListItemModal
        closeModal={closeModal}
        isOpen={isOpen}
        selectedDoc={selectedDoc}
      />
    </>
  );
};
