import { User } from "../types";
import * as React from "react";
import { Button, Card, CardContent, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link as RouterLink, useLocation } from "react-router-dom";

const API_ENDPOINT = "/api/v1/comments";

type CreateCommentProps = {
    user: User | undefined;
    authToken: string | undefined;
    post_id: number;
    refreshComments: () => void;
};

function CreateComment(props: CreateCommentProps) {
    const { user, authToken, post_id, refreshComments } = props;

    const location = useLocation();

    const [body, setBody] = React.useState<string>("");

    function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (user === undefined) {
            return;
        }

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                comment: {
                    user_id: user.id,
                    post_id: post_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                setBody("");
                refreshComments();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const [openLogInSignUpDialog, setOpenLogInSignUpDialog] = React.useState<boolean>(false);

    const handleClickAddComment = () => {
        setOpenLogInSignUpDialog(true);
    };

    const handleCloseLogInDialog = () => {
        setOpenLogInSignUpDialog(false);
    };

    const LogInSignUpDialog = (
        <Dialog open={openLogInSignUpDialog} fullWidth>
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
                Log in / Sign up to comment
                <IconButton onClick={handleCloseLogInDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: 3, paddingBottom: 2 }}>
                    You must log in to an account before you can comment
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
                <Button onClick={handleCloseLogInDialog} variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

    const [showActionButtons, setShowActionButtons] = React.useState<boolean>(false);

    return (
        <Card variant="outlined">
            <CardContent>
                {user === undefined ? (
                    <>
                        <Button onClick={handleClickAddComment}>Add comment</Button>
                        {LogInSignUpDialog}
                    </>
                ) : (
                    <form onSubmit={handleCreateSubmit}>
                        <TextField
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            onFocus={(event) => setShowActionButtons(true)}
                            fullWidth
                            multiline
                            label="Add a comment..."
                            id="body"
                            margin="dense"
                            inputProps={{ maxLength: 5000 }}
                            variant="standard"
                        />
                        {showActionButtons && (
                            <Stack direction="row" spacing={2} style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setBody("");
                                        setShowActionButtons(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="outlined" disabled={body.trim() === ""}>
                                    Comment
                                </Button>
                            </Stack>
                        )}
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default CreateComment;
