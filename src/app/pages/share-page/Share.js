import React from 'react';
import './style.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@material-ui/core';

const SharePage: React.FC = () => {
  return (
    <div className="share-page">
      <label className="label-share">Share a Youtube movie</label>
      <div className="share-form">
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth label="Youtube URL" id="fullWidth" />
        </Box>
        <div className="button-share">
          <Button color="inherit">Share</Button>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
