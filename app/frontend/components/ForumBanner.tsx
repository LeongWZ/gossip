import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';


function ForumBanner() {
  return (
    <Paper
      sx={{
        position: 'relative',
        marginBottom: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      />
      <Grid container>
        <Box
        sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
        }}
        >
            <Typography component="h1" variant="h3" gutterBottom>
                Gossip
            </Typography>
            <Typography variant="h6" gutterBottom>
                A place to chit-chat about anything
            </Typography>
            <div style={{ paddingTop: "10px" }}>
              <Button component={RouterLink} variant="contained" color="success" to='/create'>
                  <CreateIcon sx={{ paddingRight: "4px"}} />
                  Create post
              </Button>
            </div>
        </Box>
      </Grid>
    </Paper>
  );
}

export default ForumBanner;