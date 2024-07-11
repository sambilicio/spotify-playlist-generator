const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function searchTracks(query) {
  try {
    const token = await getAccessToken();
    console.log('Access token:', token);

    // Reduce the limit to 50, which is the maximum allowed by Spotify API
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=50`;
    console.log('Request URL:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Log the full response

    if (!data.tracks || !data.tracks.items) {
      console.error('Unexpected API response structure:', data);
      return [];
    }

    const tracksWithPreviews = data.tracks.items.filter(track => track.preview_url);
    const limitedTracks = tracksWithPreviews.slice(0, 8);
    return limitedTracks;
  } catch (error) {
    console.error('Error in searchTracks:', error);
    return [];
  }
}