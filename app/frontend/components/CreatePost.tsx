import { User } from "./types";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/posts";

type CreatePostProps = {
    user: User | undefined;
    token: string;
};

function CreatePost(props: CreatePostProps) {
    const { user, token } = props;

    const navigate = useNavigate();

    const [title, setTitle] = React.useState<string>("");
    const [body, setBody] = React.useState<string>("");

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
                post: {
                    username: user.username,
                    title: title,
                    body: body,
                },
            }),
        })
            .then((res) => res.json())
            .then((post) => {
                navigate(`/threads/${post.id}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Container fixed={true}>
            <Card variant="outlined">
                <CardContent>
                    <form onSubmit={handleCreateSubmit}>
                        <Typography variant="h5">Create post</Typography>
                        <TextField
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            fullWidth
                            label="Post title"
                            id="title"
                            margin="normal"
                            inputProps={{ maxLength: 120 }}
                        />
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
                            inputProps={{ maxLength: 5000 }}
                        />
                        <div style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                            <Button type="submit" variant="outlined">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreatePost;
