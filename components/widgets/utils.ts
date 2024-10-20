const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=5";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Type definition for the access token response
interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Function to get Spotify access token using refresh token
const getAccessToken = async (): Promise<AccessTokenResponse> => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: client_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch access token: ${errorData.error || response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

// Function to get recently played songs
export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recently played: ${response.statusText}`);
  }

  return await response.json();
};

// Function to extract song details from the recently played tracks
export const getRecentlyPlayedItems = async () => {
  const data = await getRecentlyPlayed();

  if (!data.items || data.items.length === 0) {
    return []; // No recently played items
  }

  return data.items.map(
    (song: {
      track: {
        album: { name: string; images: { url: string }[] };
        artists: { name: string }[];
        external_urls: { spotify: string };
        name: string;
      };
      played_at: string;
    }) => {
      const album = song.track.album.name;
      const albumImageUrl = song.track.album.images[0]?.url || "";
      const artist = song.track.artists
        .map((_artist: { name: string }) => _artist.name)
        .join(", ");
      const songUrl = song.track.external_urls.spotify;
      const title = song.track.name;
      const playedAt = song.played_at;

      return {
        album,
        albumImageUrl,
        artist,
        songUrl,
        title,
        playedAt,
      };
    },
  );
};

// Function to get currently playing song
export const getNowPlaying = async (): Promise<Response> => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// Function to extract song details from the currently playing track
export const getNowPlayingItem = async () => {
  const response = await getNowPlaying();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch currently playing track: ${response.statusText}`,
    );
  }

  const song = await response.json();

  if (!song.item) {
    return false; // No song is currently playing
  }

  const albumImageUrl = song.item.album.images[0]?.url || "";
  const artist = song.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;

  return {
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  };
};
