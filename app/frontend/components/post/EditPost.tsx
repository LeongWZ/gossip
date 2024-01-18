import { Category, Post } from "../types";
import * as React from "react";
import { Button, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const API_ENDPOINT = "/api/v1/posts";

type EditPostProps = {
    authToken: string | undefined;
    post: Post;
    categories: Category[];
    setShowPostEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPostTitle: React.Dispatch<React.SetStateAction<string>>;
    setShowPostBody: React.Dispatch<React.SetStateAction<string>>;
    setShowPostCategoryId: React.Dispatch<React.SetStateAction<number>>;
};

function EditPost(props: EditPostProps) {
    const {
        authToken,
        post,
        categories,
        setShowPostEditMode,
        setShowPostTitle,
        setShowPostBody,
        setShowPostCategoryId,
    } = props;

    const post_id = post.id;
    const [title, setTitle] = React.useState<string>(post.title);
    const [categoryId, setCategoryId] = React.useState<number>(post.category_id);
    const [body, setBody] = React.useState<string>(post.body);

    // EDIT

    const handleClickCloseEdit = () => {
        setShowPostEditMode(false);
    };

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        fetch(`${API_ENDPOINT}/${post_id}`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                post: {
                    id: post_id,
                    title: title,
                    body: body,
                    category_id: categoryId,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                setShowPostEditMode(false);
                setShowPostTitle(title);
                setShowPostBody(body);
                setShowPostCategoryId(categoryId);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
            <CardContent>
                <form onSubmit={handleEditSubmit}>
                    <Typography variant="h5">Edit Post</Typography>
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
                    <TextField
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        fullWidth
                        label="Post title"
                        id="title"
                        name="title"
                        margin="normal"
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
                        name="body"
                        margin="dense"
                    />
                    <div style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={handleClickCloseEdit}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="outlined">
                                Save
                            </Button>
                        </Stack>
                    </div>
                </form>
            </CardContent>
        </>
    );
}

export default EditPost;
