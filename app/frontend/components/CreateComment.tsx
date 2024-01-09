import { User } from "./types";
import * as React from "react";
import { Button, Card, CardContent, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link as RouterLink } from "react-router-dom";

const API_ENDPOINT = "/api/v1/comments";

type CreateCommentProps = {
    user: User | undefined;
    token: string;
    post_id: number;
    refreshComments: () => void;
};

function CreateComment(props: CreateCommentProps) {
    const { user, token, post_id, refreshComments } = props;

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
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                comment: {
                    username: user.username,
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

    const [openLogInDialog, setOpenLogInDialog] = React.useState<boolean>(false);

    const handleClickAddComment = () => {
        setOpenLogInDialog(true);
    };

    const handleCloseLogInDialog = () => {
        setOpenLogInDialog(false);
    };

    return (
        <Card variant="outlined">
            <CardContent>
                {user === undefined ? (
                    <>
                        <Button onClick={handleClickAddComment}>Add comment</Button>
                        <Dialog open={openLogInDialog} fullWidth>
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
                                    <Button component={RouterLink} to="/login">
                                        Log in
                                    </Button>
                                    <Button component={RouterLink} to="/signup">
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
                    </>
                ) : (
                    <form onSubmit={handleCreateSubmit}>
                        <Typography variant="h6">Create Comment</Typography>
                        <TextField
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            label="Message"
                            id="body"
                            margin="dense"
                            inputProps={{ maxLength: 5000 }}
                        />
                        <div style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                            <Button type="submit" variant="outlined">
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}

export default CreateComment;
