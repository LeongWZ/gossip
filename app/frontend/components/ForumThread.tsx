import { Post, Comment, User } from "./types";
import PostContent from "./PostContent";
import CreateComment from "./CreateComment";
import CommentContent from "./CommentContent";
import ErrorPage from "./ErrorPage";
import SearchBar from "./SearchBar";
import * as React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
    const [isPostFetchError, setIsPostFetchError] = React.useState<boolean>(false);

    const [comments, setComments] = React.useState<Comment[]>([]);
    const [commentsLimit, setCommentsLimit] = React.useState<number>(20);
    const [isCommentsLoading, setIsCommentsLoading] = React.useState<boolean>(false);
    const [isCommentsSortedByTop, setIsCommentsSortedByTop] = React.useState<boolean>(true);
    const [commentSearchQuery, setCommentSearchQuery] = React.useState<string>("");

    // Fetch post
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
                setIsPostFetchError(false);
            })
            .catch((err) => {
                console.error(err);
                setIsPostFetchError(true);
            });
    };

    React.useEffect(handleFetchPost, [post_id, comments]);

    // Fetch comments
    const handleFetchComments = () => {
        setIsCommentsLoading(true);

        fetch(
            `${API_ENDPOINT}/${post_id}` +
                `/comments/?limit=${commentsLimit}` +
                (isCommentsSortedByTop ? "&sort_by=top" : "&sort_by=new") +
                (commentSearchQuery ? `&q=${commentSearchQuery}` : ""),
        )
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((comments) => {
                setComments(comments);
                setIsCommentsLoading(false);
            })
            .catch((err) => {
                setIsCommentsLoading(false);
                console.error(err);
            });
    };
    React.useEffect(handleFetchComments, [commentSearchQuery, commentsLimit, isCommentsSortedByTop, post_id]);

    const handleSearchComments = (query: string) => {
        // To be passed down to SearchBar as props
        // Search posts when user submits query using SearchBar's input
        setCommentsLimit(20);
        setCommentSearchQuery(query);
    };

    const sortComments = (sortByTop: boolean) => {
        // To be passed down to SearchBar as props
        // Sort comments by top when user presses "Top" button
        setCommentsLimit(20);
        setIsCommentsSortedByTop(sortByTop);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight ||
            isCommentsLoading
        ) {
            return;
        }
        setCommentsLimit(commentsLimit + 20);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            // clean up
            window.removeEventListener("scroll", handleScroll);
        };
    });

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
            <SearchBar
                isSortedByTop={isCommentsSortedByTop}
                searchQuery={commentSearchQuery}
                handleSort={sortComments}
                handleSearch={handleSearchComments}
            />
            {comments.map((comment) => (
                <CommentContent
                    user={user}
                    token={token}
                    comment={comment}
                    refreshComments={handleFetchComments}
                    key={comment.id}
                />
            ))}
            {isCommentsLoading && <p>Loading...</p>}
            {!isCommentsLoading && comments.length === 0 && <p>No comments yet</p>}
        </Container>
    );
}

export default ForumThread;
