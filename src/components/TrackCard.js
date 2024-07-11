import React, { useState, useRef, useEffect } from 'react';
import '../styles/TrackCard.css';

function TrackCard({ track, isPlaying, onPlay, onStop, onNext, onPrevious }) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(track.preview_url));
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [track.preview_url]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  };

  const stopPlay = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    onStop();
  };

  /* Updated to use props */
  const handleNext = () => {
    stopPlay();
    onNext();
  };

  /* Updated to use props */
  const handlePrevious = () => {
    stopPlay();
    onPrevious();
  };

  return (
    <div className={`track-card ${isPlaying ? 'active' : ''}`}>
      <img src={track.album.images[0].url} alt={track.name} className="track-image" />
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artists.map(artist => artist.name).join(', ')}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="track-controls">
        <button onClick={handlePrevious}>⏮</button>
        <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
        <button onClick={stopPlay}>⏹</button>
        <button onClick={handleNext}>⏭</button>
      </div>
    </div>
  );
}

export default TrackCard;