import * as React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

type LogOutDialogProps = {
    open: boolean;
    handleCloseDialog: () => void;
    removeAuthTokenCookie: () => void;
};

function LogOutDialog(props: LogOutDialogProps) {
    const { open, handleCloseDialog, removeAuthTokenCookie } = props;

    const navigate = useNavigate();

    function handleClickLogOut() {
        removeAuthTokenCookie();
        handleCloseDialog();
        navigate("/");
        navigate(0);
    }

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
                Log out
                <IconButton onClick={handleCloseDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: "20px" }}>Are you sure you want to log out?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button variant="outlined" onClick={handleCloseDialog}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleClickLogOut} color="error" autoFocus>
                    Log out
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default LogOutDialog;
