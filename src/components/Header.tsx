import {
  AppBar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  Login,
  Logout,
  Settings,
  FormatListBulleted,
} from "@material-ui/icons";
import { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { useCollection } from "../contexts/CollectionSelector";

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
  const { collection, clearCollection } = useCollection();
  const isLarge = useMediaQuery("(min-width:500px)");
  const name = collection?.data?.().name || "";
  const isOpen = Boolean(anchorEl);

  const onSettingsClicked = () => {
    setAnchorEl(null);
  };
  const onLogoutClicked = () => {
    setAnchorEl(null);
    onLogout();
  };
  const onSwitchListClicked = () => {
    clearCollection();
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" gap={2} alignItems="baseline">
          <Typography variant="h3">
            {isLarge || !name ? "Brærspilsminitersiet" : name}
          </Typography>
          {isLarge && name && (
            <Typography variant="overline">{name}</Typography>
          )}
        </Stack>
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
                <MenuItem onClick={onSwitchListClicked}>
                  <ListItemIcon>
                    <FormatListBulleted fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Skift liste</ListItemText>
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
