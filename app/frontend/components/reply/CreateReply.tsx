import { User } from "../types";
import CommentForm from "../forms/CommentForm";
import * as React from "react";
import { Box } from "@mui/material";

const API_ENDPOINT = "/api/v1/replies";

type CreateReplyProps = {
    user: User | undefined;
    authToken: string | undefined;
    comment_id: number;
    post_id: number;
    recipient_username: string;
    refreshComments: () => void;
    refreshReplies: () => void;
    handleClose: () => void;
};

function CreateReply(props: CreateReplyProps) {
    const { user, authToken, comment_id, post_id, recipient_username, refreshComments, refreshReplies, handleClose } =
        props;

    function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (user === undefined) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const body = data.get("body") as string;

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                reply: {
                    user_id: user.id,
                    comment_id: comment_id,
                    post_id: post_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                handleClose();
                refreshComments();
                refreshReplies();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Box sx={{ paddingBottom: 5, paddingLeft: 2, paddingRight: 2 }}>
            <CommentForm
                label="Add a reply"
                submitButtonLabel="Reply"
                autoFocus={true}
                defaultCommentBody={recipient_username === "" ? "" : `@${recipient_username} `}
                handleFormSubmit={handleCreateSubmit}
                handleFormCancel={handleClose}
            />
        </Box>
    );
}

export default CreateReply;
