import EditPost from "./EditPost";
import { Post, User, Category } from "../types";
import time_ago from "../time_ago";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, IconButton, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const API_ENDPOINT = "/api/v1/posts";

type ShowPostProps = {
    user: User | undefined;
    authToken: string | undefined;
    post: Post;
    categories: Category[];
};

function ShowPost(props: ShowPostProps) {
    const { user, authToken, post, categories } = props;

    const navigate = useNavigate();

    const post_id = post.id;
    const post_username = post.username;
    const [title, setTitle] = React.useState<string>(post.title);
    const [body, setBody] = React.useState<string>(post.body);
    const [categoryId, setCategoryId] = React.useState<number>(post.category_id);
    const created_time_ago = time_ago(post.created_at);

    // EDIT
    const [editMode, setEditMode] = React.useState(false);

    const handleClickOpenEdit = () => {
        setEditMode(true);
    };

    // DELETE
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    function handleClickDeletePost() {
        fetch(`${API_ENDPOINT}/${post_id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                post: {
                    id: post_id,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                navigate(`/`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Card variant="outlined">
            {editMode ? (
                <EditPost
                    authToken={authToken}
                    post={post}
                    categories={categories}
                    setShowPostEditMode={setEditMode}
                    setShowPostTitle={setTitle}
                    setShowPostBody={setBody}
                    setShowPostCategoryId={setCategoryId}
                />
            ) : (
                <>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            gutterBottom
                            sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap", justifyContent: "" }}
                        >
                            {title}
                        </Typography>
                        <div style={{ paddingBottom: 10 }}>
                            <Chip label={categories.find((category) => category.id === categoryId)?.name} />
                        </div>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                            Posted by {post_username} · {created_time_ago}
                        </Typography>
                        <Typography variant="body2" sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                            {body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {user && post_username === user.username && (
                            <>
                                <Button size="small" onClick={handleClickOpenEdit}>
                                    Edit
                                </Button>
                                <Button size="small" onClick={handleClickOpenDeleteDialog}>
                                    Delete
                                </Button>
                            </>
                        )}
                        <Dialog open={openDeleteDialog} fullWidth>
                            <DialogTitle
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingBottom: "10px",
                                    borderBottom: 1,
                                    borderColor: "divider",
                                }}
                            >
                                Delete post
                                <IconButton onClick={handleCloseDeleteDialog} size="small" sx={{ paddingTop: "0px" }}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ paddingTop: "20px" }}>
                                    Are you sure you want to delete your post?
                                    <br />
                                    All comments under this post will also be deleted.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ paddingRight: 2 }}>
                                <Button variant="outlined" onClick={handleCloseDeleteDialog}>
                                    Keep
                                </Button>
                                <Button variant="outlined" color="error" onClick={handleClickDeletePost} autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                </>
            )}
        </Card>
    );
}

export default ShowPost;
