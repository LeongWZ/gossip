import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ErrorPage() {
    return (
        <Container sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Page not found
            </Typography>
            <div style={{ marginTop: "30px" }}>
                <Button component={RouterLink} to="/" variant="contained">
                    Go Home
                </Button>
            </div>
        </Container>
    );
}

export default ErrorPage;
