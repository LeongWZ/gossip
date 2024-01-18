import { Reply, User } from "./types";
import time_ago from "./time_ago";
import CreateReply from "./CreateReply";
import EditReply from "./EditReply";
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
import { Link as RouterLink, useLocation } from "react-router-dom";

const API_ENDPOINT = "/api/v1/replies";

type ShowReplyProps = {
    user: User | undefined;
    authToken: string | undefined;
    comment_id: number;
    post_id: number;
    reply: Reply;
    refreshComments: () => void;
    refreshReplies: () => void;
};

function ShowReply(props: ShowReplyProps) {
    const { user, authToken, comment_id, post_id, reply, refreshComments, refreshReplies } = props;

    const location = useLocation();

    const reply_id = reply.id;
    const reply_username = reply.username;
    const [body, setBody] = React.useState<string>(reply.body);
    const created_time_ago = time_ago(reply.created_at);

    // EDIT
    const [editMode, setEditMode] = React.useState(false);

    const handleClickOpenEdit = () => {
        setEditMode(true);
    };

    // DELETE
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    function handleClickDeleteReply() {
        fetch(`${API_ENDPOINT}/${reply_id}`, {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                reply: {
                    id: reply_id,
                },
            }),
        })
            .then((res) => {
                setOpenDeleteDialog(false);
                refreshComments();
                refreshReplies();
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
                Delete reply
                <IconButton onClick={handleCloseDeleteDialog} size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: "20px" }}>
                    Are you sure you want to delete your reply?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button variant="outlined" onClick={handleCloseDeleteDialog}>
                    Keep
                </Button>
                <Button variant="outlined" color="error" onClick={handleClickDeleteReply} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );

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
        <Card variant="outlined" sx={{ border: 0 }}>
            {editMode ? (
                <EditReply
                    authToken={authToken}
                    reply={reply}
                    setShowReplyEditMode={setEditMode}
                    setShowReplyBody={setBody}
                />
            ) : (
                <>
                    <CardContent>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                            {reply_username} · {created_time_ago}
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {user && reply_username === user.username && (
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
                            authToken={authToken}
                            comment_id={comment_id}
                            post_id={post_id}
                            recipient_username={reply_username}
                            refreshComments={refreshComments}
                            refreshReplies={refreshReplies}
                            handleClose={handleCloseCreateReply}
                        />
                    )}
                </>
            )}
        </Card>
    );
}

export default ShowReply;
