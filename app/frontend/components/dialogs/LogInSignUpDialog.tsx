import * as React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link as RouterLink, useLocation } from "react-router-dom";

type LogInSignUpDialogProps = {
    open: boolean;
    handleCloseDialog: () => void;
};

function LogInSignUpDialog(props: LogInSignUpDialogProps) {
    const { open, handleCloseDialog } = props;

    const location = useLocation();

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: 1,
                    paddingBottom: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                Log in / Sign up
                <IconButton onClick={handleCloseDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: 3, paddingBottom: 2 }}>
                    You must log in to an account before you can proceed
                </DialogContentText>
                <Stack direction="row" spacing={2}>
                    <Button component={RouterLink} to="/login" replace state={{ from: location }}>
                        Log in
                    </Button>
                    <Button component={RouterLink} to="/signup" replace state={{ from: location }}>
                        Sign up
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button onClick={handleCloseDialog} variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogInSignUpDialog;
