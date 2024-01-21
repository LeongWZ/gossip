import CreateReply from "./CreateReply";
import EditReply from "./EditReply";
import { Reply, User } from "../types";
import time_ago from "../../helpers/time_ago";
import DeleteDialog from "../dialogs/DeleteDialog";
import LogInSignUpDialog from "../dialogs/LogInSignUpDialog";
import * as React from "react";
import { Button, Card, CardContent, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/replies";

type ReplyContentProps = {
    user: User | undefined;
    authToken: string | undefined;
    comment_id: number;
    post_id: number;
    reply: Reply;
    refreshComments: () => void;
    refreshReplies: () => void;
};

function ReplyContent(props: ReplyContentProps) {
    const { user, authToken, comment_id, post_id, reply, refreshComments, refreshReplies } = props;

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

                        <LogInSignUpDialog open={openLogInSignUpDialog} handleCloseDialog={handleCloseLogInDialog} />
                    </CardActions>

                    <DeleteDialog
                        open={openDeleteDialog}
                        title="Delete reply"
                        body="Are you sure you want to delete your reply?"
                        handleCloseDialog={handleCloseDeleteDialog}
                        handleClickDelete={handleClickDeleteReply}
                    />

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

export default ReplyContent;
