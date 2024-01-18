import { Reply } from "./types";
import time_ago from "./time_ago";
import * as React from "react";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

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
    const [body, setBody] = React.useState<string>(reply.body);
    const created_time_ago = time_ago(reply.created_at);

    // EDIT
    const handleClickCloseEdit = () => {
        setShowReplyEditMode(false);
    };

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
                setShowReplyEditMode(false);
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
            <form onSubmit={handleEditSubmit}>
                <TextField
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    onFocus={(event) =>
                        event.currentTarget.setSelectionRange(
                            event.currentTarget.value.length,
                            event.currentTarget.value.length,
                        )
                    }
                    autoFocus
                    fullWidth
                    multiline
                    label="Edit reply"
                    id="body"
                    name="body"
                    margin="dense"
                    inputProps={{ maxLength: 5000 }}
                    variant="standard"
                />
                <Stack direction="row" spacing={2} style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                    <Button variant="outlined" onClick={handleClickCloseEdit}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="outlined" disabled={body.trim() === ""}>
                        Save
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default EditReply;
