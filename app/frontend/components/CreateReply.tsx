import { User } from "./types";
import * as React from "react";
import { Box, Button, Card, CardContent, Container, IconButton, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/replies";

type CreateReplyProps = {
    user: User | undefined;
    token: string;
    comment_id: number;
    post_id: number;
    recipient_username: string;
    refreshComments: () => void;
    refreshReplies: () => void;
    handleClose: () => void;
};

function CreateReply(props: CreateReplyProps) {
    const { user, token, comment_id, post_id, recipient_username, refreshComments, refreshReplies, handleClose } =
        props;

    const [body, setBody] = React.useState<string>(recipient_username === "" ? "" : `@${recipient_username} `);

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
                reply: {
                    username: user.username,
                    comment_id: comment_id,
                    post_id: post_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                setBody("");
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
            <form onSubmit={handleCreateSubmit}>
                <TextField
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    onFocus={(event) =>
                        event.currentTarget.setSelectionRange(
                            event.currentTarget.value.length,
                            event.currentTarget.value.length,
                        )
                    }
                    required
                    autoFocus
                    fullWidth
                    multiline
                    label="Add a reply"
                    id="body"
                    margin="dense"
                    inputProps={{ maxLength: 5000 }}
                    variant="standard"
                />
                <Stack direction="row" spacing={2} style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="outlined">
                        Reply
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default CreateReply;
