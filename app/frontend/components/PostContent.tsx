import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Post } from './types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {User} from './types';
import timeAgo from './TimeAgo';

const API_BASE = '/api/v1/posts';

function getUrl(id: number):string {
    return `${API_BASE}/${id}`;
}

type PostContentProps = {
    user: User|undefined;
    token: string;
    post: Post;
}

function PostContent(props: PostContentProps) {
    const {user, token, post} = props;

    const navigate = useNavigate();

    const post_id = post.id;
    const post_username = post.username;
    const [title, setTitle] = React.useState<string>(post.title);
    const [body, setBody] = React.useState<string>(post.body);
    const created_time_ago = timeAgo(post.created_at);

    // EDIT
    const [editMode, setEditMode] = React.useState(false);

    const handleClickOpenEdit = () => {
        setEditMode(true);
    };

    const handleClickCloseEdit = () => {
        setEditMode(false);
    };

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        fetch(getUrl(post_id), {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    id: post_id,
                    title: title,
                    body: body,
                },
            }),
        })
            .then( (res) => {
                setEditMode(false);
            })
            .catch((err) => {console.error(err)});
    }

    // DELETE
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
    
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    function handleClickDeletePost() {
        fetch(getUrl(post_id), {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                post: {
                    id: post_id,
                }
            }),
        })
            .then( (res) => {
                navigate(`/`);
            })
            .catch((err) => {console.error(err)});
    }

    return (
        <Card variant="outlined">
            {editMode
                ?   <>
                        <CardContent>
                            <form onSubmit={handleEditSubmit}>
                                <Typography variant='h5'>Edit Post</Typography>
                                <TextField
                                    value={title}
                                    onChange={(event) => {setTitle(event.target.value)}}
                                    required
                                    fullWidth
                                    label="Post title"
                                    id="title"
                                    margin='normal'
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
                                />
                                <div style={{ float:"right", margin:"10px 5px 10px 0px"}}>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant='outlined' onClick={handleClickCloseEdit}>Cancel</Button>
                                        <Button type='submit' variant='outlined'>Save</Button>
                                    </Stack>
                                </div>
                            </form>
                        </CardContent>
                    </>
                :   <>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                                {title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                                Posted by {post_username} · {created_time_ago}
                            </Typography>
                            <Typography variant="body2" sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                                {body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {user && post_username === user.username &&
                                <>
                                    <Button size="small" onClick={handleClickOpenEdit}>
                                        Edit
                                    </Button>
                                    <Button size="small" onClick={handleClickOpenDeleteDialog}>
                                        Delete
                                    </Button>
                                </>
                            }
                            <Dialog
                                open={openDeleteDialog}
                                fullWidth
                            >
                                <DialogTitle
                                    sx={{ display:'flex', justifyContent: 'space-between', paddingBottom:'10px', borderBottom: 1, borderColor: 'divider' }}
                                >
                                    Delete post
                                    <IconButton onClick={handleCloseDeleteDialog} size='small' sx={{ paddingTop:'0px' }}>
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText sx={{ paddingTop: "20px" }}>
                                    Are you sure you want to delete your post?
                                    <br />
                                    All comments under this post will also be deleted.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ paddingRight: 2 }}>
                                    <Button variant="outlined" onClick={handleCloseDeleteDialog}>
                                        Keep
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={handleClickDeletePost} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </CardActions>
                    </>
            }
        </Card>

    );
}

export default PostContent;