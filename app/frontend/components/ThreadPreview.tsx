import * as React from 'react';
import { Post } from './types';
import { Card, CardContent, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from "./App.module.css";
import timeAgo from './TimeAgo';

type ThreadPreviewProps = {
    item: Post;
}

function ThreadPreview(props: ThreadPreviewProps) {
    const {item} = props;

    return (
        <Card variant="outlined" key={item.id}>
            <CardActionArea component={RouterLink} to={`/threads/${item.id}`}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                        {item.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                        Posted by {item.username} · {timeAgo(item.created_at)}
                    </Typography>
                    <Typography
                        className={item.body.length > 250 ? styles.fadedown: ""}
                        variant="body2"
                        sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap", maxHeight: "250px", overflow: "hidden" }}
                    >
                        {item.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{`${item.comments_count} comments`}</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default ThreadPreview;
