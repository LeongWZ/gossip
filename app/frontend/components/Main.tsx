import PostPreview from "./post/PostPreview";
import Banner from "./Banner";
import CategoryBar from "./toolbars/CategoryBar";
import SearchBar from "./toolbars/SearchBar";
import { Category, Post } from "./types";
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
            <Banner />
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
                <PostPreview post={post} categories={categories} key={post.id} />
            ))}

            <div style={{ minHeight: "300px" }}>
                {isPostsLoading && <p>Loading...</p>}

                {!isPostsLoading && posts.length === 0 && <p>No results found</p>}
            </div>
        </Container>
    );
}

export default Main;
