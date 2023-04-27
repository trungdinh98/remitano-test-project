import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

const YOUTUBE_API_KEY = 'AIzaSyCY_cIummVhoQCRPK3hLUIiIrOdiuhagqg';

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
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
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.snippet.title}</h2>
          <p>{video.snippet.description}</p>
          <p>Views: {video.statistics.viewCount}</p>
          <p>Likes: {video.statistics.likeCount}</p>
          <p>Dislikes: {video.statistics.dislikeCount}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
