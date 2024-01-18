import { Category, Post } from "./types";
import ForumThreadPreview from "./ForumThreadPreview";
import ForumBanner from "./ForumBanner";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import { Container } from "@mui/material";
import * as React from "react";

type MainProps = {
    categories: Category[];
    posts: Post[];
    isPostsLoading: boolean;
    isPostsSortedByTop: boolean;
    postSearchQuery: string;
    categoryIdFilter: number;
    setPostsLimit: React.Dispatch<React.SetStateAction<number>>;
    sortPosts: (sortByTop: boolean) => void;
    handleSearchPosts: (query: string) => void;
    filterPostsByCategory: (category_id: number) => void;
};

function Main(props: MainProps) {
    const {
        categories,
        posts,
        isPostsLoading,
        isPostsSortedByTop,
        postSearchQuery,
        categoryIdFilter,
        setPostsLimit,
        sortPosts,
        handleSearchPosts,
        filterPostsByCategory,
    } = props;

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight ||
            isPostsLoading
        ) {
            return;
        }
        setPostsLimit(posts.length + 20);
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
            <CategoryBar
                categories={categories}
                categoryIdFilter={categoryIdFilter}
                filterPostsByCategory={filterPostsByCategory}
            />
            <SearchBar
                isSortedByTop={isPostsSortedByTop}
                searchQuery={postSearchQuery}
                handleSort={sortPosts}
                handleSearch={handleSearchPosts}
            />

            {posts.map((post) => (
                <ForumThreadPreview post={post} categories={categories} key={post.id} />
            ))}

            <div style={{ minHeight: "300px" }}>
                {isPostsLoading && <p>Loading...</p>}

                {!isPostsLoading && posts.length === 0 && <p>No results found</p>}
            </div>
        </Container>
    );
}

export default Main;
