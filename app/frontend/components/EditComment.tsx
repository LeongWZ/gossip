import { Comment } from "./types";
import time_ago from "./time_ago";
import * as React from "react";
import { Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

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
    const [body, setBody] = React.useState<string>(comment.body);
    const created_time_ago = time_ago(comment.created_at);

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
                    label="Edit comment"
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

export default EditComment;
