import { User, Post } from "./types";
import useStorageState from "./useStorageState";
import Main from "./Main";
import ForumThread from "./ForumThread";
import Header from "./Header";
import CreatePost from "./CreatePost";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import ProtectedComponent from "./ProtectedComponent";
import AuthComponent from "./AuthComponent";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

    // Fetch posts
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [postsLimit, setPostsLimit] = React.useState<number>(20);
    const [isPostsLoading, setIsPostsLoading] = React.useState<boolean>(false);
    const [isPostsSortedByTop, setIsPostsSortedByTop] = React.useState<boolean>(true);
    const [postSearchQuery, setPostSearchQuery] = React.useState<string>("");

    const handleFetchPosts = () => {
        setIsPostsLoading(true);

        fetch(
            `${API_ENDPOINT}/posts/?limit=${postsLimit}` +
                (isPostsSortedByTop ? "&sort_by=top" : "") +
                (postSearchQuery ? `&q=${postSearchQuery}` : ""),
        )
            .then((res) => {
                return res.json();
            })
            .then((fetchedPosts) => {
                setPosts(fetchedPosts);
                setIsPostsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    React.useEffect(handleFetchPosts, [postsLimit, isPostsSortedByTop, postSearchQuery]);

    const sortPostsByTop = () => {
        // To be passed down to Main as props
        // Sort posts by top when user presses "Top" button
        setPostsLimit(20);
        setIsPostsSortedByTop(true);
    };

    const sortPostsByNew = () => {
        // To be passed down to Main as props
        // Sort posts by new when user presses "New" button
        setPostsLimit(20);
        setIsPostsSortedByTop(false);
    };

    const router = createBrowserRouter([
        {
            element: (
                <>
                    <Header user={user} setToken={setToken} />
                    <Outlet />
                </>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Main
                            posts={posts}
                            postsLimit={postsLimit}
                            isPostsLoading={isPostsLoading}
                            isPostsSortedByTop={isPostsSortedByTop}
                            postSearchQuery={postSearchQuery}
                            setPostsLimit={setPostsLimit}
                            setPostSearchQuery={setPostSearchQuery}
                            sortPostsByTop={sortPostsByTop}
                            sortPostsByNew={sortPostsByNew}
                        />
                    ),
                },
                {
                    path: "/threads/:post_id",
                    element: <ForumThread user={user} token={token} />,
                },
                {
                    path: "/create",
                    element: (
                        <ProtectedComponent user={user}>
                            <CreatePost user={user} token={token} />
                        </ProtectedComponent>
                    ),
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
