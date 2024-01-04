import * as React from 'react';
import { Route, Routes } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import Main from './Main';
import ForumThread from './ForumThread';
import Header from './Header';
import CreatePost from './CreatePost';
import ErrorPage from './ErrorPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from './SignUp';
import LogIn from './LogIn';
import useStorageState from './useStorageState';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          //mode: "light",
        },
      }),
    [prefersDarkMode],
  );

  const [userJson, setUserJson] = useStorageState("userJson", "");
  const [token, setToken] = useStorageState("token", "");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header userJson={userJson} setUserJson={setUserJson} setToken={setToken} />
        <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/threads/:post_id" element={ <ForumThread userJson={userJson} token={token} /> } />
          <Route path="/create" element={ <CreatePost userJson={userJson} token={token} /> } />
          <Route path="/signup" element={ <SignUp setUserJson={setUserJson} setToken={setToken} /> } />
          <Route path="/login" element={ <LogIn setUserJson={setUserJson} setToken={setToken} /> } />
          <Route path="*" element={ <ErrorPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;