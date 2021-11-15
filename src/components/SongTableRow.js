import React from 'react';
import ReactStars from "react-rating-stars-component";

import Button from 'react-bootstrap/Button';

export default function SongTableRow(
  { song,
    index,
    spotifyID,
    songData,
    setSongData,
    playerSongID,
    setPlayerSongID,
    setPlayerSongAsPlayed,
    setShowAddToPlaylistModal,
    setAddToPlaylistChosenSong
  }) {

  const addToPlaylist = (spotifyID) => {
    setAddToPlaylistChosenSong(songData.find(song => song.spotifyID === spotifyID));
    setShowAddToPlaylistModal(true);
  }

  const ratingChanged = (newRating) => {
    const currentSongIndex = songData.findIndex((song) => song.spotifyID === spotifyID);
    songData[currentSongIndex].rating = newRating;

    setSongData([...songData]);
  };

  return (
    <tr
      className="align-middle" key={song.spotifyID} onDoubleClick={() => {
        setPlayerSongID(song.spotifyID);
        setPlayerSongAsPlayed(false);
      }
      }>
      <td>
        {index + 1}
        {spotifyID === playerSongID ?
          <span className="badge bg-success ms-3 me-0">Active</span>
          : ''}
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
      <td className="text-center">
        <Button key={song.spotifyID} onClick={() => addToPlaylist(song.spotifyID)} variant='success' size='sm'>Add to Playlist</Button>
      </td>
    </tr >
  )
}