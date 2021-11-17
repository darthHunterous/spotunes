import React from 'react';
import ReactStars from "react-rating-stars-component";

export default function SongTableRow(
  { song,
    index,
    spotifyID,
    songData,
    setSongData,
    playerSongID,
    setPlayerSongID,
    setShowInfoSong,
    setPlayerSongAsPlayed,
    setCurrentSongIndex
  }) {

  const ratingChanged = (newRating) => {
    const currentSongIndex = songData.findIndex((song) => song.spotifyID === spotifyID);
    songData[currentSongIndex].rating = newRating;

    setSongData([...songData]);
  };

  function handlePlayButton() {
    setPlayerSongID(spotifyID);
    setCurrentSongIndex(index);
    setPlayerSongAsPlayed(false);
  }

  function handleShowButton() {
    const song = songData.find(song => song.spotifyID === spotifyID);
    setShowInfoSong(song);
  }

  return (
    <tr className="align-middle" key={song.spotifyID}>
      <td>
        <span>{index + 1}</span>
        <span className="badge bg-secondary ms-2 cursor-pointer" onClick={() => handleShowButton()}>Show</span>
        {spotifyID === playerSongID
          ? <span className="badge bg-success">Active</span>
          : <span className="badge bg-primary cursor-pointer" onClick={() => handlePlayButton()}>Play</span>
        }
      </td>
      <td>{song.title}</td>
      <td>{song.length_string}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.playCount}</td>
      <td>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          teste={123}
          size={24}
          activeColor="#ffd700"
          value={song.rating}
        />
      </td>
    </tr >
  )
}