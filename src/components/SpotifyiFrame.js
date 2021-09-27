import React from 'react';

export default function SpotifyiFrame({ playerSongID }) {
  return (
    <>
      {(playerSongID !== '')
        ? <iframe
          title="Spotify Embedded Player"
          src={`https://open.spotify.com/embed/track/${playerSongID}?theme=0`}
          width="100%"
          height="100%"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          seamless="seamless">
        </iframe>
        : <img
          src="/spotifyiFrame-placeholder.jpg"
          alt="Spotify iFrame Placeholder"
          width="100%"
          height="100%" />
      }
    </>
  )
}
