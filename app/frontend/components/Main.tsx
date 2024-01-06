import { Post } from "./types";
import ThreadPreview from "./ThreadPreview";
import ForumBanner from "./ForumBanner";
import SearchBar from "./SearchBar";
import { Container } from "@mui/material";
import * as React from "react";

const API_ENDPOINT = "/api/v1/posts";

function Main() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const rowsToAdd = 20;
    const [limit, setLimit] = React.useState<number>(rowsToAdd);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleFetchPosts = () => {
        setIsLoading(true);

        fetch(`${API_ENDPOINT}/?limit=${limit}`)
            .then((res) => res.json())
            .then((fetchedPosts) => {
                setPosts(fetchedPosts);
                setIsLoading(false);
            });
    };

    React.useEffect(handleFetchPosts, [limit]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }
        setLimit(limit + rowsToAdd);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            // clean up
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <Container fixed={true}>
            <ForumBanner />
            <SearchBar />
            {posts.map((item) => (
                <ThreadPreview item={item} key={item.id} />
            ))}
            {isLoading && <p>Loading...</p>}
        </Container>
    );
}

export default Main;
