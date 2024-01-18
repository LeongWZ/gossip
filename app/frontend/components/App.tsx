import { User, Post, Category } from "./types";
import Main from "./Main";
import ForumThread from "./ForumThread";
import Header from "./Header";
import CreatePost from "./post/CreatePost";
import ErrorPage from "./ErrorPage";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";
import AuthComponent from "./auth/AuthComponent";
import ScrollTop from "./ScrollTop";
import useCookieState from "../hooks/useCookieState";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab } from "@mui/material";

const API_ENDPOINT = "/api/v1";

function App() {
    // Fetch dark or light Mode
    const [prefersDarkMode, setPrefersDarkMode] = React.useState<boolean>(
        useMediaQuery("(prefers-color-scheme: dark)"),
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode],
    );

    // Fetch authentication token and user
    const [authToken, setAuthToken, removeAuthTokenCookie] = useCookieState("auth_token", undefined);
    const [user, setUser] = React.useState<User | undefined>(undefined);

    React.useEffect(() => {
        fetch(`${API_ENDPOINT}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((user) => setUser(user));
    }, [authToken]);

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
                    <Header
                        user={user}
                        prefersDarkMode={prefersDarkMode}
                        removeAuthTokenCookie={removeAuthTokenCookie}
                        setPrefersDarkMode={setPrefersDarkMode}
                    />
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
                    <ScrollRestoration />
                </>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Main
                            categories={categories}
                            posts={posts}
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
                    element: <ForumThread user={user} authToken={authToken} categories={categories} />,
                },
                {
                    path: "/create",
                    element: <CreatePost user={user} authToken={authToken} categories={categories} />,
                },
                {
                    path: "/signup",
                    element: (
                        <AuthComponent user={user}>
                            <SignUp setAuthToken={setAuthToken} />
                        </AuthComponent>
                    ),
                },
                {
                    path: "/login",
                    element: (
                        <AuthComponent user={user}>
                            <LogIn setAuthToken={setAuthToken} />
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
