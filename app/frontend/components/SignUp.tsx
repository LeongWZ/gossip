import { User } from "./types";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link as RouterLink, Navigate } from "react-router-dom";

type SignUpProps = {
    user: User | undefined;
    setToken: React.Dispatch<React.SetStateAction<string>>;
};

function SignUp(props: SignUpProps) {
    const { user, setToken } = props;

    const navigate = useNavigate();

    const [username, setUsername] = React.useState<string>("");

    const [showError, setShowError] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch("api/v1/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username: username,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 201) {
                    throw res;
                }

                return res.json();
            })
            .then((resJson) => {
                const { token } = resJson;
                setToken(token);
                setShowError(false);
                navigate("/");
            })
            .catch((err) => {
                setShowError(true);
                console.error(err);
            });
    };

    if (user !== undefined) {
        return <Navigate to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
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
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
                    <TextField
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                    />

                    {showError && (
                        <Typography variant="body2" color="red">
                            Username has been taken or has not met requirements
                        </Typography>
                    )}

                    <Typography variant="body2" marginTop={5}>
                        *Username length must be between 1 to 38 characters
                        <br />
                        *Username must not contain spaces
                    </Typography>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
