import React, { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiDialog-container": {
      alignItems: "start",
    },
    "& .MuiPaper-root": {
      minWidth: "50%",
    },
  },
});

export const CustomDialog: FC<{
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  action?: React.ReactElement;
}> = ({ isOpen, onClose, action, title, children }) => {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.root}
      open={Boolean(isOpen)}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {title && <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {action && <DialogActions>{action}</DialogActions>}
    </Dialog>
  );
};
