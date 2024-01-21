import EditPost from "./EditPost";
import { Post, User, Category } from "../types";
import time_ago from "../../helpers/time_ago";
import DeleteDialog from "../dialogs/DeleteDialog";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
const API_ENDPOINT = "/api/v1/posts";

type PostContentProps = {
    user: User | undefined;
    authToken: string | undefined;
    post: Post;
    categories: Category[];
};

function PostContent(props: PostContentProps) {
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

                        <DeleteDialog
                            open={openDeleteDialog}
                            title="Delete post"
                            body={
                                "Are you sure you want to delete your post?\n" +
                                "All comments under this post will also be deleted"
                            }
                            handleCloseDialog={handleCloseDeleteDialog}
                            handleClickDelete={handleClickDeletePost}
                        />
                    </CardActions>
                </>
            )}
        </Card>
    );
}

export default PostContent;
