import { Post, Comment, User } from "./types";
import PostContent from "./PostContent";
import CreateComment from "./CreateComment";
import CommentContent from "./CommentContent";
import ErrorPage from "./ErrorPage";
import * as React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

const API_ENDPOINT = "/api/v1/posts";

type ForumThreadProps = {
    user: User | undefined;
    token: string;
};

function ForumThread(props: ForumThreadProps) {
    const { user, token } = props;

    const params = useParams() as { post_id: string };
    const post_id = parseInt(params.post_id, 10);

    const [post, setPost] = React.useState<Post | undefined>(undefined);
    const [comments, setComments] = React.useState<Comment[]>([]);

    const [isPostFetchError, setIsPostFetchError] = React.useState<boolean>(false);

    const [showAllComments, setShowAllComments] = React.useState<boolean>(false);

    const handleFetchPost = () => {
        fetch(`${API_ENDPOINT}/${post_id}`)
            .then((res) => {
                if (res.status !== 200) {
                    throw res.statusText;
                }
                return res.json();
            })
            .then((post) => {
                setPost(post);
                setShowAllComments(showAllComments || post.comments_count <= 5);
                setIsPostFetchError(false);
            })
            .catch((err) => {
                console.error(err);
                setIsPostFetchError(true);
            });
    };
    React.useEffect(handleFetchPost, [post_id, showAllComments, comments]);

    const handleFetchComments = () => {
        fetch(`${API_ENDPOINT}/${post_id}/comments` + (showAllComments ? "" : "/?sort_by=new&limit=5"))
            .then((res) => res.json())
            .then((comments) => {
                setComments(showAllComments ? comments : comments.reverse());
            })
            .catch((err) => {
                console.error(err);
            });
    };
    React.useEffect(handleFetchComments, [post_id, showAllComments]);

    const handleClickShowAllComments = () => {
        setShowAllComments(true);
    };

    if (isPostFetchError) {
        return <ErrorPage />;
    }

    return (
        <Container fixed={true}>
            {post ? (
                <PostContent user={user} token={token} post={post} />
            ) : (
                <Typography variant="body2">Loading... </Typography>
            )}
            <br />
            <Typography variant="h5" gutterBottom>
                {post ? post.comments_count : 0} Comments
            </Typography>
            <CreateComment user={user} token={token} post_id={post_id} refreshComments={handleFetchComments} />
            {!showAllComments && (
                <Box paddingTop={2} paddingBottom={2}>
                    <Button onClick={handleClickShowAllComments} fullWidth>
                        Show all {post ? post.comments_count : 0} comments
                    </Button>
                </Box>
            )}
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
