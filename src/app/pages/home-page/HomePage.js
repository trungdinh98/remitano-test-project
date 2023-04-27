import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { Button } from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from '@material-ui/icons';
import ReactPlayer from 'react-player';
import Grid from '@mui/material/Grid';

const YOUTUBE_API_KEY = 'AIzaSyCY_cIummVhoQCRPK3hLUIiIrOdiuhagqg';

const HomePage: React.FC = () => {
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [videos, setVideos] = useState([]);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisLiked, setIsDisLiked] = React.useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const handleDislike = () => {
    setIsDisLiked(!isDisLiked);
  };

  useEffect(() => {
    if (localStorage.user !== 'null') {
      setIsLogIn(true);
    }
    const fetchData = async () => {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            key: YOUTUBE_API_KEY,
            part: 'snippet,statistics',
            chart: 'mostPopular',
            maxResults: 10,
          },
        }
      );
      setVideos(response.data.items);
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {videos.map((video) => (
        <Grid key={video.id} container spacing={2} className="video-card">
          <Grid item xs={6} className="video-palyer">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id}`}
              width="100%"
              playing={true}
              controls={true}
            />
          </Grid>
          <Grid item xs={6} className="video-content">
            <div className="video-detail">
              <div className="video-title">{video.snippet.title}</div>
              <div className="video-author">
                Share by: {video.snippet.channelTitle}
              </div>
            </div>
            <div className="video-action">
              <div className="action">
                <div>{video.statistics.likeCount}</div>
                <Button onClick={handleLike} disabled={!isLogIn}>
                  {isLiked ? <ThumbUp /> : <ThumbUpAltOutlined />}
                </Button>
              </div>
              <div className="action">
                <div>{Math.floor(video.statistics.likeCount / 10)}</div>
                <Button onClick={handleDislike} disabled={!isLogIn}>
                  {isDisLiked ? <ThumbDown /> : <ThumbDownAltOutlined />}
                </Button>
              </div>
            </div>
            <div className="video-detail">
              <div>Description:</div>
              <div className="video-description">
                {video.snippet.description}
              </div>
            </div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default HomePage;
