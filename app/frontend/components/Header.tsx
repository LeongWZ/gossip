import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { User } from './types'
import { useNavigate, Link as RouterLink } from 'react-router-dom';

type HeaderProps = {
    userJson: string;
    setUserJson: React.Dispatch<React.SetStateAction<string>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

function Header(props: HeaderProps) {
    const { userJson, setUserJson, setToken } = props;
    const user: User|undefined = userJson === "" ? undefined : JSON.parse(userJson);

    const navigate = useNavigate();

    const [openLogOutDialog, setOpenLogOutDialog] = React.useState<boolean>(false);

    const handleClickOpenLogOutDialog = () => {
        setOpenLogOutDialog(true);
    };

    const handleCloseLogOutDialog = () => {
        setOpenLogOutDialog(false);
    };

    function handleClickLogOut() {
        localStorage.removeItem("userJson");
        setUserJson("");
        localStorage.removeItem("token");
        setToken("");
        handleCloseLogOutDialog();
        navigate("/");
    };

    return (
        <>
        <Toolbar sx={{ justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', marginBottom: 4, }}>
            <Typography
                component={RouterLink}
                to="/"
                variant="h5"
                color="inherit"
                align="left"
                sx={{ textDecoration: "None", paddingTop: 1 }}
            >
                Gossip
            </Typography>

            
            {user === undefined
                ?   <Stack direction="row" spacing={2}>
                        <Button component={RouterLink} to="/signup" variant="outlined" size="small">
                            Sign up
                        </Button>
                        <Button component={RouterLink} to="/login" variant="outlined" size="small">
                            Log in
                        </Button>
                    </Stack>
                :   <>
                        <Stack direction="row" spacing={2}>
                            <Typography textAlign='center' flex={1} paddingTop={1}>
                                Welcome {user.username}
                            </Typography>
                            <Button variant="outlined" onClick={handleClickOpenLogOutDialog} size="small" sx={{ paddingTop: 1 }}>
                                Log out
                            </Button>
                        </Stack>
                        <Dialog
                            open={openLogOutDialog}
                            fullWidth
                        >
                            <DialogTitle
                                sx={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingRight: 1,
                                    paddingBottom: 1,
                                    borderBottom: 1,
                                    borderColor: 'divider'
                                }}
                            >
                                Log out
                                <IconButton onClick={handleCloseLogOutDialog} size="small" sx={{ paddingTop: '0px' }}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ paddingTop: "20px" }}>
                                    Are you sure you want to log out?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2}}>
                                <Button variant="outlined" onClick={handleCloseLogOutDialog}>
                                    Cancel
                                </Button>
                                <Button variant="outlined" onClick={handleClickLogOut} color="error" autoFocus>
                                    Log out
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
            }
        </Toolbar>
        </>
    );
}

export default Header;