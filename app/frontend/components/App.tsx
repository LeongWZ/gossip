import { User } from "./types";
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
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
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

    const [token, setToken] = useStorageState("token", "");
    const [user, setUser] = React.useState<User | undefined>(undefined);

    React.useEffect(() => {
        fetch("api/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((user) => setUser(user));
    }, [token]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header user={user} setToken={setToken} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/threads/:post_id" element={<ForumThread user={user} token={token} />} />
                    <Route
                        path="/create"
                        element={
                            <ProtectedComponent user={user}>
                                <CreatePost user={user} token={token} />
                            </ProtectedComponent>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthComponent user={user}>
                                <SignUp setToken={setToken} />
                            </AuthComponent>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthComponent user={user}>
                                <LogIn setToken={setToken} />
                            </AuthComponent>
                        }
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
