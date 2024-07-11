import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/header';
import Form from './components/Form';
import Playlist from './components/playlist';

function App() {
  const [playlist, setPlaylist] =useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handlePlaylistGenerated = (tracks) => {
    console.log("Playlist generated:", tracks);
    setPlaylist(tracks);
  };

  return (
    <div className="App">
      <Header />
      <Form onPlaylistGenerated={handlePlaylistGenerated} />
      <Playlist tracks={playlist} 
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack
      } />
    </div>
  );
}
export default App;