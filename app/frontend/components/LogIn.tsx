import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";

type LogInProps = {
    setToken: React.Dispatch<React.SetStateAction<string>>;
};

function LogIn(props: LogInProps) {
    const { setToken } = props;

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || {};

    const [username, setUsername] = React.useState<string>("");

    const [showError, setShowError] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch("api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                auth: {
                    username: username,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 202) {
                    throw res;
                }

                return res.json();
            })
            .then((resJson) => {
                const { token } = resJson;
                setToken(token);
                setShowError(false);
                navigate(from?.pathname || "/", { replace: true });
            })
            .catch((err) => {
                console.error(err);
                setShowError(true);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                    <TextField
                        margin="normal"
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                    />

                    {showError && (
                        <Typography variant="body2" color="red">
                            Username not found
                        </Typography>
                    )}

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Log In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/signup" state={{ from: from }} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default LogIn;
