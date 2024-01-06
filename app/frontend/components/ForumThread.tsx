import { Post, Comment, User } from "./types";
import PostContent from "./PostContent";
import CreateComment from "./CreateComment";
import CommentContent from "./CommentContent";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const API_BASE = "/api/v1/posts";

function getPostUrl(id: number): string {
    return `${API_BASE}/${id}`;
}

function getCommentsUrl(id: number): string {
    return `${API_BASE}/${id}/comments`;
}

type ForumThreadProps = {
    user: User | undefined;
    token: string;
};

function ForumThread(props: ForumThreadProps) {
    const { user, token } = props;

    const params = useParams() as { post_id: string };
    const post_id = parseInt(params.post_id, 10);

    const navigate = useNavigate();

    const [post, setPost] = React.useState<Post>();
    const [comments, setComments] = React.useState<Comment[]>([]);

    const handleFetchPost = () => {
        fetch(getPostUrl(post_id))
            .then((res) => res.json())
            .then((post) => {
                setPost(post);
            })
            .catch((err) => {
                console.error(err);
                navigate("error");
            });
    };
    React.useEffect(handleFetchPost, [comments]);

    const handleFetchComments = () => {
        fetch(getCommentsUrl(post_id))
            .then((res) => res.json())
            .then((comments) => {
                setComments(comments);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    React.useEffect(handleFetchComments);

    return (
        <Container fixed={true}>
            {post === undefined ? (
                <Typography variant="body2">Loading... </Typography>
            ) : (
                <PostContent user={user} token={token} post={post} />
            )}
            <br />
            <Typography variant="h5" gutterBottom>
                {post === undefined ? 0 : post.comments_count} Comments
            </Typography>
            <CreateComment user={user} token={token} post_id={post_id} refreshComments={handleFetchComments} />
            {comments.map((comment) => (
                <CommentContent
                    user={user}
                    token={token}
                    comment={comment}
                    refreshComments={handleFetchComments}
                    key={comment.id}
                />
            ))}
        </Container>
    );
}

export default ForumThread;
