import { Comment, User } from "./types";
import time_ago from "./time_ago";
import * as React from "react";
import { Button, Card, CardContent, CardActions, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const API_BASE = "/api/v1/comments";

function getUrl(id: number): string {
    return `${API_BASE}/${id}`;
}

type CommentContentProps = {
    user: User | undefined;
    token: string;
    comment: Comment;
    refreshComments: () => void;
};

function CommentContent(props: CommentContentProps) {
    const { user, token, comment, refreshComments } = props;

    const comment_id = comment.id;
    const comment_username = comment.username;
    const [body, setBody] = React.useState<string>(comment.body);
    const created_time_ago = time_ago(comment.created_at);

    // EDIT
    const [editMode, setEditMode] = React.useState(false);

    const handleClickOpenEdit = () => {
        setEditMode(true);
    };

    const handleClickCloseEdit = () => {
        setEditMode(false);
    };

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        fetch(getUrl(comment_id), {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                comment: {
                    id: comment_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                setEditMode(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // DELETE
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    function handleClickDeleteComment() {
        fetch(getUrl(comment_id), {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                comment: {
                    id: comment_id,
                },
            }),
        })
            .then((res) => {
                setOpenDeleteDialog(false);
                refreshComments();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const DeleteDialog = (
        <Dialog open={openDeleteDialog} onClose={handleClickOpenDeleteDialog} fullWidth={true}>
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
                Delete comment
                <IconButton onClick={handleCloseDeleteDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: "20px" }}>
                    Are you sure you want to delete your comment?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button variant="outlined" onClick={handleCloseDeleteDialog}>
                    Keep
                </Button>
                <Button variant="outlined" color="error" onClick={handleClickDeleteComment} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Card variant="outlined">
            {editMode ? (
                <>
                    <CardContent>
                        <form onSubmit={handleEditSubmit}>
                            <Typography variant="h5">Edit comment</Typography>
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
                            />
                            <div style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" onClick={handleClickCloseEdit}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="outlined">
                                        Save
                                    </Button>
                                </Stack>
                            </div>
                        </form>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardContent>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                            {comment_username} · {created_time_ago}
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {user && comment_username === user.username && (
                            <>
                                <Button size="small" onClick={handleClickOpenEdit}>
                                    Edit
                                </Button>
                                <Button size="small" onClick={handleClickOpenDeleteDialog}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </CardActions>
                    {DeleteDialog}
                </>
            )}
        </Card>
    );
}

export default CommentContent;
