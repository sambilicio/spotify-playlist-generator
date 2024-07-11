import React, { useState, useEffect, useRef } from 'react';
import TrackCard from './TrackCard';
import '../styles/Playlist.css';

function Playlist({ tracks }) {
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const prevTracksRef = useRef();

  useEffect(() => {
    if (prevTracksRef.current && prevTracksRef.current !== tracks) {
      setPlayingTrackId(null);
    }
    prevTracksRef.current = tracks;
  }, [tracks]);

  const handlePlay = (trackId) => {
    setPlayingTrackId(trackId);
  };

  const handleStop = () => {
    setPlayingTrackId(null);
  };

  const handleNext = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    setPlayingTrackId(tracks[nextIndex].id);
  };

  const handlePrevious = (currentIndex) => {
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setPlayingTrackId(tracks[previousIndex].id);
  };

  return (
    <div className="playlist">
      <h2>Generated Playlist</h2>
      <div className="track-list">
        {tracks.map((track, index) => (
          <TrackCard 
            key={track.id} 
            track={track} 
            isPlaying={track.id === playingTrackId}
            onPlay={() => handlePlay(track.id)}
            onStop={handleStop}
            onNext={() => handleNext(index)}
            onPrevious={() => handlePrevious(index)}
            currentIndex={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;