import { Reply } from "../types";
import time_ago from "../../helpers/time_ago";
import CommentForm from "../forms/CommentForm";
import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/replies";

type EditReplyProps = {
    authToken: string | undefined;
    reply: Reply;
    setShowReplyEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReplyBody: React.Dispatch<React.SetStateAction<string>>;
};

function EditReply(props: EditReplyProps) {
    const { authToken, reply, setShowReplyEditMode, setShowReplyBody } = props;

    const reply_id = reply.id;
    const reply_username = reply.username;
    const body = reply.body;
    const created_time_ago = time_ago(reply.created_at);

    // EDIT
    const handleClickCloseEdit = () => {
        setShowReplyEditMode(false);
    };

    function handleEditFormData(body: string): void {
        fetch(`${API_ENDPOINT}/${reply_id}`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                reply: {
                    id: reply_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                setShowReplyBody(body);
                handleClickCloseEdit();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Box sx={{ paddingTop: 2, paddingBottom: 5, paddingLeft: 2, paddingRight: 2 }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                {reply_username} · {created_time_ago}
            </Typography>
            <CommentForm
                label="Edit reply"
                submitButtonLabel="Save"
                autoFocus={true}
                defaultCommentBody={body}
                handleFormData={handleEditFormData}
                handleFormCancel={handleClickCloseEdit}
            />
        </Box>
    );
}

export default EditReply;
