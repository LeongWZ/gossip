import { User, Category } from "../types";
import * as React from "react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import {
    Button,
    Container,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogTitle,
    Dialog,
    IconButton,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const API_ENDPOINT = "/api/v1/posts";

type CreatePostProps = {
    user: User | undefined;
    authToken: string | undefined;
    categories: Category[];
};

function CreatePost(props: CreatePostProps) {
    const { user, authToken, categories } = props;

    const navigate = useNavigate();
    const location = useLocation();

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
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                post: {
                    user_id: user.id,
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

    const LogInSignUpDialog = (
        <Dialog open={user === undefined} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingRight: 1,
                    paddingBottom: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                Log in / Sign up to post
                <IconButton component={RouterLink} to="/" size="small" sx={{ paddingTop: "0px" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: 3, paddingBottom: 2 }}>
                    You must log in to an account before you can post
                </DialogContentText>
                <Stack direction="row" spacing={2}>
                    <Button component={RouterLink} to="/login" replace state={{ from: location }}>
                        Log in
                    </Button>
                    <Button component={RouterLink} to="/signup" replace state={{ from: location }}>
                        Sign up
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                <Button component={RouterLink} to="/" variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Container fixed={true}>
            {LogInSignUpDialog}

            <Card variant="outlined">
                <CardContent>
                    <form onSubmit={handleCreateSubmit}>
                        <Typography variant="h5">Create post</Typography>
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
