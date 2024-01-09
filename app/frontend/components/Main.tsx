import { Post } from "./types";
import ThreadPreview from "./ThreadPreview";
import ForumBanner from "./ForumBanner";
import SearchBar from "./SearchBar";
import { Container } from "@mui/material";
import * as React from "react";

type MainProps = {
    posts: Post[];
    postsLimit: number;
    isPostsLoading: boolean;
    isPostsSortedByTop: boolean;
    postSearchQuery: string;
    setPostsLimit: React.Dispatch<React.SetStateAction<number>>;
    setPostSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    sortPostsByTop: () => void;
    sortPostsByNew: () => void;
};

function Main(props: MainProps) {
    const {
        posts,
        postsLimit,
        isPostsLoading,
        isPostsSortedByTop,
        postSearchQuery,
        setPostsLimit,
        setPostSearchQuery,
        sortPostsByTop,
        sortPostsByNew,
    } = props;

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight ||
            isPostsLoading
        ) {
            return;
        }
        setPostsLimit(postsLimit + 20);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            // clean up
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const handleSearch = (query: string) => {
        setPostSearchQuery(query);
    };

    return (
        <Container fixed={true}>
            <ForumBanner />
            <SearchBar
                isSortedByTop={isPostsSortedByTop}
                searchQuery={postSearchQuery}
                handleSortByNew={sortPostsByNew}
                handleSortByTop={sortPostsByTop}
                handleSearch={handleSearch}
            />
            {posts.map((item) => (
                <ThreadPreview item={item} key={item.id} />
            ))}
            {isPostsLoading && <p>Loading...</p>}
            {!isPostsLoading && postSearchQuery && posts.length === 0 && <p>No results found</p>}
        </Container>
    );
}

export default Main;
