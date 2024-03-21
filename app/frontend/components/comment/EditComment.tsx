import { Comment } from "../types";
import time_ago from "../../helpers/time_ago";
import CommentForm from "../forms/CommentForm";
import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/comments";

type EditCommentProps = {
    authToken: string | undefined;
    comment: Comment;
    setShowCommentEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowCommentBody: React.Dispatch<React.SetStateAction<string>>;
};

function EditComment(props: EditCommentProps) {
    const { authToken, comment, setShowCommentEditMode, setShowCommentBody } = props;

    const comment_id = comment.id;
    const comment_username = comment.username;
    const body = comment.body;
    const created_time_ago = time_ago(comment.created_at);

    function handleEditFormData(body: string): void {
        fetch(`${API_ENDPOINT}/${comment_id}`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                comment: {
                    id: comment_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                setShowCommentEditMode(false);
                setShowCommentBody(body);

                // TODO: Replace with hook
                if (comment !== null) {
                    comment.body = body;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleClickCloseEdit = () => {
        setShowCommentEditMode(false);
    };

    return (
        <Box sx={{ paddingTop: 2, paddingBottom: 5, paddingLeft: 2, paddingRight: 2 }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                {comment_username} · {created_time_ago}
            </Typography>

            <CommentForm
                label="Edit comment"
                submitButtonLabel="Save"
                autoFocus={true}
                defaultCommentBody={body}
                handleFormData={handleEditFormData}
                handleFormCancel={handleClickCloseEdit}
            />
        </Box>
    );
}

export default EditComment;
