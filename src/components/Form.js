import React, { useState } from 'react';
import { searchTracks } from '../services/spotifyService';

function Form({ onPlaylistGenerated }) {
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [feeling, setFeeling] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = `${color} ${city} ${feeling}`;
    console.log("Search query:", searchQuery);
    try {
      console.log("Calling searchTracks...");
      const tracks = await searchTracks(searchQuery);
      console.log("Tracks received:", tracks);
      onPlaylistGenerated(tracks);  // Call this function with the received tracks
    } catch (error) {
      console.error('Error generating playlist:', error);
      onPlaylistGenerated([]);  // Call with empty array in case of error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Enter a color"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <input
        type="text"
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="Enter a feeling"
      />
      <button type="submit">Generate Playlist</button>
    </form>
  );
}

export default Form;