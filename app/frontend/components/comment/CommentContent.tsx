import EditComment from "./EditComment";
import { Comment, Reply, User } from "../types";
import time_ago from "../../helpers/time_ago";
import CreateReply from "../reply/CreateReply";
import ReplyContent from "../reply/ReplyContent";
import DeleteDialog from "../dialogs/DeleteDialog";
import LogInSignUpDialog from "../dialogs/LogInSignUpDialog";
import * as React from "react";
import { Button, Card, CardContent, CardActions, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const API_ENDPOINT = "/api/v1/comments";

type CommentContentProps = {
    user: User | undefined;
    authToken: string | undefined;
    comment: Comment;
    refreshComments: () => void;
};

function CommentContent(props: CommentContentProps) {
    const { user, authToken, comment, refreshComments } = props;

    const comment_id = comment.id;
    const comment_username = comment.username;
    const [body, setBody] = React.useState<string>(comment.body);
    const created_time_ago = time_ago(comment.created_at);

    // EDIT
    const [editMode, setEditMode] = React.useState<boolean>(false);

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

    function handleClickDeleteComment() {
        fetch(`${API_ENDPOINT}/${comment_id}`, {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
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

    const [replies, setReplies] = React.useState<Reply[]>([]);
    const [openReplies, setOpenReplies] = React.useState<boolean>(false);
    const [isRepliesLoading, setIsRepliesLoading] = React.useState<boolean>(false);

    // Fetch replies
    const handleFetchReplies = () => {
        setIsRepliesLoading(true);

        fetch(`${API_ENDPOINT}/${comment_id}/replies/?sort_by=old`)
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((replies) => {
                setReplies(replies);
                setIsRepliesLoading(false);
                if (replies.length === 0 && openReplies) {
                    setOpenReplies(false);
                }
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

    return (
        <Card variant="outlined">
            {editMode ? (
                <EditComment
                    authToken={authToken}
                    comment={comment}
                    setShowCommentEditMode={setEditMode}
                    setShowCommentBody={setBody}
                />
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

                        <LogInSignUpDialog open={openLogInSignUpDialog} handleCloseDialog={handleCloseLogInDialog} />
                    </CardActions>

                    <DeleteDialog
                        open={openDeleteDialog}
                        title="Delete comment"
                        body="Are you sure you want to delete your comment?"
                        handleCloseDialog={handleCloseDeleteDialog}
                        handleClickDelete={handleClickDeleteComment}
                    />
                </>
            )}

            {openCreateReply && (
                <CreateReply
                    user={user}
                    authToken={authToken}
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
                                authToken={authToken}
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
        </Card>
    );
}

export default CommentContent;
