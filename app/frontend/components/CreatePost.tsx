import * as React from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Button, Container, Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { User } from "./types";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const API_ENDPOINT = "/api/v1/posts";

type CreatePostProps = {
    userJson: string;
    token: string;
};

function CreatePost(props: CreatePostProps) {
    const {userJson, token} = props;
    const user: User|undefined = userJson === "" ? undefined : JSON.parse(userJson);

    const navigate = useNavigate()

    const [title, setTitle] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');

    function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (user === undefined) {
            return;
        }

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    username: user.username,
                    title: title,
                    body: body,
                }
            }),
        })
            .then((res) => res.json())
            .then( (post) => {
                navigate(`/threads/${post.id}`);
            })
            .catch((err) => {console.error(err);});
    };

    return (
        <Container fixed={true}>
            <Card variant="outlined">
                <CardContent>
                    <form onSubmit={handleCreateSubmit}>
                        <Typography variant='h5'>Create post</Typography>
                        <TextField
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            fullWidth
                            label="Post title"
                            id="title"
                            margin='normal'
                            inputProps={{ maxLength: 120 }}
                        />
                        <TextField
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            label="Message"
                            id="body"
                            margin="dense"
                            inputProps={{ maxLength: 5000 }}
                        />
                        <div style={{ float:"right", margin:"10px 5px 10px 0px"}}> 
                        <Button type='submit' variant='outlined'>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Dialog
                open={user === undefined}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        paddingRight: 1,
                        paddingBottom: 1,
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    Log in / Sign up to post
                    <IconButton component={RouterLink} to="/" size="small" sx={{ paddingTop: '0px' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ paddingTop: 3, paddingBottom: 3}}>
                        You must log in to an account before you can post
                    </DialogContentText>
                    <Button component={RouterLink} to="/" color="secondary" sx={{ padding: 0}}>
                        Go back
                    </Button>
                </DialogContent>
                <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
                    <Button component={RouterLink} to="/login" variant="outlined">
                        Log in
                    </Button>
                    <Button component={RouterLink} to="/signup" variant="outlined">
                        Sign up
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default CreatePost;
