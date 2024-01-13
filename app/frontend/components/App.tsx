import { User, Post, Category } from "./types";
import useStorageState from "./useStorageState";
import Main from "./Main";
import ForumThread from "./ForumThread";
import Header from "./Header";
import CreatePost from "./CreatePost";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import AuthComponent from "./AuthComponent";
import ScrollTop from "./ScrollTop";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab } from "@mui/material";

const API_ENDPOINT = "/api/v1";

function App() {
    // Fetch dark or light Mode
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                    //mode: "light",
                },
            }),
        [prefersDarkMode],
    );

    // Fetch authentication token and user
    const [token, setToken] = useStorageState("token", "");
    const [user, setUser] = React.useState<User | undefined>(undefined);

    React.useEffect(() => {
        fetch(`${API_ENDPOINT}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((user) => setUser(user));
    }, [token]);

    // Fetch categories
    const [categories, setCategories] = React.useState<Category[]>([]);

    const handleFetchCategories = () => {
        fetch(`${API_ENDPOINT}/categories`)
            .then((res) => {
                return res.json();
            })
            .then((fetchedCategories) => {
                setCategories(fetchedCategories);
            })
            .catch((err) => console.error(err));
    };
    React.useEffect(handleFetchCategories, []);

    const [categoryIdFilter, setCategoryIdFilter] = React.useState<number>(0);

    const filterPostsByCategory = (category_id: number) => {
        // To be passed down to Main as props
        // Filter posts by category using category.id
        setPostsLimit(20);
        setIsPostsSortedByTop(true);
        setCategoryIdFilter(category_id);
    };

    // Fetch posts
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [postsLimit, setPostsLimit] = React.useState<number>(20);
    const [isPostsLoading, setIsPostsLoading] = React.useState<boolean>(false);
    const [isPostsSortedByTop, setIsPostsSortedByTop] = React.useState<boolean>(true);
    const [postSearchQuery, setPostSearchQuery] = React.useState<string>("");

    const handleFetchPosts = () => {
        setIsPostsLoading(true);

        fetch(
            API_ENDPOINT +
                (categoryIdFilter ? `/categories/${categoryIdFilter}` : "") +
                `/posts/?limit=${postsLimit}` +
                (isPostsSortedByTop ? "&sort_by=top" : "&sort_by=new") +
                (postSearchQuery ? `&q=${postSearchQuery}` : ""),
        )
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((fetchedPosts) => {
                setPosts(fetchedPosts);
                setIsPostsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    React.useEffect(handleFetchPosts, [categoryIdFilter, postsLimit, isPostsSortedByTop, postSearchQuery]);

    const handleSearchPosts = (query: string) => {
        // To be passed down to Main as props
        // Search posts when user submits query using SearchBar's input
        setPostsLimit(20);
        setPostSearchQuery(query);
    };

    const sortPosts = (sortByTop: boolean) => {
        // To be passed down to Main as props
        // Sort posts by top when user presses "Top" button
        setPostsLimit(20);
        setIsPostsSortedByTop(sortByTop);
    };

    const router = createBrowserRouter([
        {
            element: (
                <>
                    <Header user={user} setToken={setToken} />
                    <div id="back-to-top-anchor" />
                    <Outlet />
                    {/*
                        Do not remove Outlet!
                        It allows routes in children below to be accessible.
                    */}
                    <ScrollTop>
                        <Fab size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Main
                            categories={categories}
                            posts={posts}
                            postsLimit={postsLimit}
                            isPostsLoading={isPostsLoading}
                            isPostsSortedByTop={isPostsSortedByTop}
                            postSearchQuery={postSearchQuery}
                            categoryIdFilter={categoryIdFilter}
                            setPostsLimit={setPostsLimit}
                            sortPosts={sortPosts}
                            handleSearchPosts={handleSearchPosts}
                            filterPostsByCategory={filterPostsByCategory}
                        />
                    ),
                },
                {
                    path: "/threads/:post_id",
                    element: <ForumThread user={user} token={token} />,
                },
                {
                    path: "/create",
                    element: <CreatePost user={user} token={token} categories={categories} />,
                },
                {
                    path: "/signup",
                    element: (
                        <AuthComponent user={user}>
                            <SignUp setToken={setToken} />
                        </AuthComponent>
                    ),
                },
                {
                    path: "/login",
                    element: (
                        <AuthComponent user={user}>
                            <LogIn setToken={setToken} />
                        </AuthComponent>
                    ),
                },
                {
                    path: "*",
                    element: <ErrorPage />,
                },
            ],
        },
    ]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    );
}

export default App;
