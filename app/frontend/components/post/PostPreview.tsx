import { Category, Post } from "../types";
import time_ago from "../../helper/time_ago";
import styles from "../../styles/App.module.css";
import * as React from "react";
import { Card, CardContent, CardActionArea, CardActions, Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

type PostPreviewProps = {
    post: Post;
    categories: Category[];
};

function PostPreview(props: PostPreviewProps) {
    const { post, categories } = props;

    return (
        <Card variant="outlined" key={post.id}>
            <CardActionArea component={RouterLink} to={`/threads/${post.id}`}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom
                        sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
                    >
                        {post.title}
                    </Typography>
                    <div style={{ paddingBottom: 10 }}>
                        <Chip label={categories.find((category) => category.id === post.category_id)?.name} />
                    </div>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                        Posted by {post.username} · {time_ago(post.created_at)}
                    </Typography>
                    <Typography
                        className={post.body.length > 250 ? styles.fadedown : ""}
                        variant="body2"
                        sx={{
                            wordBreak: "break-all",
                            whiteSpace: "pre-wrap",
                            maxHeight: "250px",
                            overflow: "hidden",
                        }}
                    >
                        {post.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{`${post.comments_count + post.replies_count} comments`}</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default PostPreview;
