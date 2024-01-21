import { User } from "./types";
import LogOutDialog from "./dialogs/LogOutDialog";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, IconButton, Switch, FormControlLabel, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";

type HeaderMenuProps = {
    prefersDarkMode: boolean;
    removeAuthTokenCookie: () => void;
    setPrefersDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function HeaderMenu(props: HeaderMenuProps) {
    const { prefersDarkMode, removeAuthTokenCookie, setPrefersDarkMode } = props;

    // Toggle Dark Mode
    const handleClickControlDarkMode = () => {
        setPrefersDarkMode(!prefersDarkMode);
    };

    // Handle Log Out
    const [openLogOutDialog, setOpenLogOutDialog] = React.useState<boolean>(false);

    const handleClickOpenLogOutDialog = () => {
        setOpenLogOutDialog(true);
    };

    // For go to Top button
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ paddingTop: 1, paddingBottom: 1 }}>
            <IconButton
                aria-controls={open ? "header-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="header-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem>
                    <FormControlLabel
                        control={<Switch checked={prefersDarkMode} onChange={handleClickControlDarkMode} />}
                        label="Dark mode"
                        labelPlacement="start"
                        sx={{ marginLeft: 0 }}
                    />
                </MenuItem>
                <MenuItem onClick={handleClickOpenLogOutDialog}>Log out</MenuItem>
            </Menu>

            <LogOutDialog
                open={openLogOutDialog}
                handleCloseDialog={() => setOpenLogOutDialog(false)}
                removeAuthTokenCookie={removeAuthTokenCookie}
            />
        </div>
    );
}

type HeaderProps = {
    user: User | undefined;
    prefersDarkMode: boolean;
    removeAuthTokenCookie: () => void;
    setPrefersDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header(props: HeaderProps) {
    const { user, prefersDarkMode, removeAuthTokenCookie, setPrefersDarkMode } = props;

    const location = useLocation();

    return (
        <>
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                    marginBottom: 4,
                }}
            >
                <Typography
                    component={RouterLink}
                    to="/"
                    variant="h5"
                    color="inherit"
                    align="left"
                    sx={{ textDecoration: "None", paddingTop: 1, paddingBottom: 1, paddingRight: 5 }}
                >
                    Gossip
                </Typography>

                {user === undefined ? (
                    <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                        <Button
                            component={RouterLink}
                            to="/signup"
                            replace
                            state={{ from: location }}
                            variant="outlined"
                            size="small"
                        >
                            Sign up
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/login"
                            replace
                            state={{ from: location }}
                            variant="outlined"
                            size="small"
                        >
                            Log in
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                            <Typography flex={1} paddingTop={1} paddingBottom={1} textAlign="right">
                                Welcome {user.username}
                            </Typography>
                            <HeaderMenu
                                prefersDarkMode={prefersDarkMode}
                                removeAuthTokenCookie={removeAuthTokenCookie}
                                setPrefersDarkMode={setPrefersDarkMode}
                            />
                        </Stack>
                    </>
                )}
            </Toolbar>
        </>
    );
}

export default Header;
