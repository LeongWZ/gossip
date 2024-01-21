import * as React from "react";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

type DeleteDialogProps = {
    open: boolean;
    title: string;
    body: string;
    handleCloseDialog: () => void;
    handleClickDelete: () => void;
};

function DeleteDialog(props: DeleteDialogProps) {
    const { open, title, body, handleCloseDialog, handleClickDelete } = props;

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
                {title}
                <IconButton onClick={handleCloseDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: "20px", whiteSpace: "pre-line" }}>{body}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button variant="outlined" onClick={handleCloseDialog}>
                    Keep
                </Button>
                <Button variant="outlined" color="error" onClick={handleClickDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
