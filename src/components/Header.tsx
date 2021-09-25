import {
  AppBar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Login, Logout, Settings } from "@material-ui/icons";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { useMachine } from "@xstate/react";
import { authMachine } from "../machines/authMachine";

const ProfileWrapper = styled("div")`
  margin-left: auto;
`;

export const Header = ({
  onLogin,
  onLogout,
  isLoggedIn,
}: {
  onLogin: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const onSettingsClicked = () => {
    setAnchorEl(null);
  };
  const onLogoutClicked = () => {
    setAnchorEl(null);
    onLogout();
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3">Brærspilsminitersiet</Typography>
        <ProfileWrapper>
          {isLoggedIn ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={onSettingsClicked}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={onLogoutClicked}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={onLogin}>
              <Login color="inherit" />
            </IconButton>
          )}
        </ProfileWrapper>
      </Toolbar>
    </AppBar>
  );
};
