import React, { useEffect, useState } from 'react';

export default function SpotifyiFrame({ playerSongID, playerSongAsPlayed, setPlayerSongAsPlayed, songData, setSongData }) {
  const [timerFlag, setTimerFlag] = useState(false);

  const repeatedAction = () => {
    const elem = document.activeElement;

    if (elem && elem.tagName == 'IFRAME' && !playerSongAsPlayed) {
      document.activeElement.blur();

      const currentSongIndex = songData.findIndex((song) => song.spotifyID === playerSongID);
      songData[currentSongIndex].playCount += 1;

      setSongData([...songData]);

      setPlayerSongAsPlayed(true);
    }

    setTimerFlag(!timerFlag);
  }

  useEffect(() => {
    const monitor = setInterval(repeatedAction, 100);
    return () => clearInterval(monitor);
  }, [timerFlag]);

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
          height="100%"
        />
      }
    </>
  )
}
