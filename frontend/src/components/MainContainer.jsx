import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useNetflixStore } from '../../store/netflixStore'

const MainContainer = () => {
  const { nowPlayingMovies } = useNetflixStore();


  if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
    return null;
  }

  const { overview, id, title } = nowPlayingMovies[0];

  return (
    <div>
      <VideoTitle overview={overview} title={title} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

