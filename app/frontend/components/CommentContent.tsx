import { Comment, Reply, User } from "./types";
import time_ago from "./time_ago";
import CreateReply from "./CreateReply";
import ReplyContent from "./ReplyContent";
import * as React from "react";
import { Button, Card, CardContent, CardActions, IconButton, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const API_ENDPOINT = "/api/v1/comments";

type CommentContentProps = {
    user: User | undefined;
    token: string;
    comment: Comment;
    refreshComments: () => void;
};

function CommentContent(props: CommentContentProps) {
    const { user, token, comment, refreshComments } = props;

    const location = useLocation();

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

        fetch(`${API_ENDPOINT}/${comment_id}`, {
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
        fetch(`${API_ENDPOINT}/${comment_id}`, {
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

    const [replies, setReplies] = React.useState<Reply[]>([]);
    const [openReplies, setOpenReplies] = React.useState<boolean>(false);
    const [isRepliesLoading, setIsRepliesLoading] = React.useState<boolean>(false);

    // Fetch replies
    const handleFetchReplies = () => {
        setIsRepliesLoading(true);

        fetch(`${API_ENDPOINT}/${comment_id}/replies`)
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((replies) => {
                setReplies(replies);
                setIsRepliesLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleClickOpenReplies = () => {
        setOpenReplies(true);
        handleFetchReplies();
    };

    const handleClickCloseReplies = () => {
        setOpenReplies(false);
    };

    const [openCreateReply, setOpenCreateReply] = React.useState<boolean>(false);

    const handleClickReply = () => {
        if (user) {
            setOpenCreateReply(true);
        } else {
            setOpenLogInSignUpDialog(true);
        }
    };

    const handleCloseCreateReply = () => {
        setOpenCreateReply(false);
    };

    const [openLogInSignUpDialog, setOpenLogInSignUpDialog] = React.useState<boolean>(false);

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
                Log in / Sign up to reply
                <IconButton onClick={handleCloseLogInDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: 3, paddingBottom: 2 }}>
                    You must log in to an account before you can reply
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

    return (
        <Card variant="outlined">
            {editMode ? (
                <>
                    <CardContent>
                        <form onSubmit={handleEditSubmit}>
                            <Typography variant="h6" gutterBottom>
                                Edit comment
                            </Typography>
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
                        <Button size="small" onClick={handleClickReply}>
                            Reply
                        </Button>
                        {LogInSignUpDialog}
                    </CardActions>

                    {DeleteDialog}

                    {openCreateReply && (
                        <CreateReply
                            user={user}
                            token={token}
                            comment_id={comment_id}
                            post_id={comment.post_id}
                            recipient_username=""
                            refreshComments={refreshComments}
                            refreshReplies={handleClickOpenReplies}
                            handleClose={handleCloseCreateReply}
                        />
                    )}

                    {!openReplies && comment.replies_count > 0 && (
                        <Box padding={2}>
                            <Button onClick={handleClickOpenReplies}>
                                <ArrowDropDownIcon sx={{ marginBottom: 0.5 }} />
                                Open {comment.replies_count} replies
                            </Button>
                        </Box>
                    )}

                    {openReplies && (
                        <>
                            <Box paddingLeft={5}>
                                {replies.map((reply) => (
                                    <ReplyContent
                                        user={user}
                                        token={token}
                                        comment_id={comment_id}
                                        post_id={comment.post_id}
                                        reply={reply}
                                        refreshComments={refreshComments}
                                        refreshReplies={handleClickOpenReplies}
                                        key={reply.id}
                                    />
                                ))}

                                {isRepliesLoading && <p>Loading...</p>}
                            </Box>
                            <Box padding={2}>
                                <Button onClick={handleClickCloseReplies}>
                                    <ArrowDropUpIcon />
                                    Close {comment.replies_count} replies
                                </Button>
                            </Box>
                        </>
                    )}
                </>
            )}
        </Card>
    );
}

export default CommentContent;
