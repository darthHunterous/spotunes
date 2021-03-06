import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MusicPlayerControls({ playerSongID, setPlayerSongID, filteredSongData, currentSongIndex, setCurrentSongIndex, setPlayerSongAsPlayed }) {
  const SIZE = 48;
  let current_path = useLocation().pathname;

  useEffect(() => {
    setCurrentSongIndex(-1);
  }, [current_path]);

  function handleStop() {
    setPlayerSongID('');
    setCurrentSongIndex(-1);
  }

  function handleSkipBackward() {
    let nextIndex;
    if (currentSongIndex <= 0) {
      nextIndex = filteredSongData.length - 1;
    }
    else {
      nextIndex = currentSongIndex - 1;
    }

    setPlayerSongID(filteredSongData[nextIndex].spotifyID);
    setCurrentSongIndex(nextIndex);
    setPlayerSongAsPlayed(false);
  }

  function handleSkipForward() {
    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= filteredSongData.length) {
      nextIndex -= filteredSongData.length;
    }

    setPlayerSongID(filteredSongData[nextIndex].spotifyID);
    setCurrentSongIndex(nextIndex);
    setPlayerSongAsPlayed(false);
  }

  return (
    <>
      <div className="d-flex align-items-center player">
        <svg xmlns="http://www.w3.org/2000/svg" width={SIZE} height={SIZE} style={{ marginRight: 32 }} fill="currentColor" onClick={() => handleSkipBackward()} class="bi bi-skip-start-fill" viewBox="0 0 16 16">
          <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width={SIZE} height={SIZE} style={{ marginRight: 32 }} onClick={() => handleStop()} fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width={SIZE} height={SIZE} fill="currentColor" onClick={() => handleSkipForward()} class="bi bi-skip-end-fill" viewBox="0 0 16 16">
          <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
        </svg>
      </div>
    </>
  )
}