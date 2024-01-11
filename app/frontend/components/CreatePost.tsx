import { User, Category } from "./types";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const API_ENDPOINT = "/api/v1/posts";

type CreatePostProps = {
    user: User | undefined;
    token: string;
    categories: Category[];
};

function CreatePost(props: CreatePostProps) {
    const { user, token, categories } = props;

    const navigate = useNavigate();

    const [title, setTitle] = React.useState<string>("");
    const [categoryId, setCategoryId] = React.useState<number | string>("");
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
                    category_id: categoryId,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 201) {
                    throw res;
                }
                return res.json();
            })
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
                        <div>
                            <FormControl required sx={{ marginTop: 2, marginBottom: 1, minWidth: 120 }}>
                                <InputLabel id="category-select-required-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-required-label"
                                    id="category-select-required"
                                    value={categoryId}
                                    label="Category"
                                    onChange={(event) => setCategoryId(event.target.value as number)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem value={category.id} key={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
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
