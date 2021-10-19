import React from 'react';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export default function SongTable({ songData, setPlayerSongID, setShowAddToPlaylistModal, setAddToPlaylistChosenSong }) {
  const addToPlaylist = (spotifyID) => {
    setAddToPlaylistChosenSong(songData.find(song => song.spotifyID === spotifyID));
    setShowAddToPlaylistModal(true);
  }

  return (
    <>
      {
        (songData.length > 0)
          ? <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Length</th>
                <th>Artist</th>
                <th>Album</th>
                <th className='text-center'>Rating</th>
                <th className='text-center'>Add To Playlist</th>
              </tr>
            </thead >
            <tbody>
              {songData.map((song, index) => (
                <tr onDoubleClick={() => setPlayerSongID(song.spotifyID)}>
                  <td>{index + 1}</td>
                  <td>{song.title}</td>
                  <td>{song.length_string}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.rating}</td>
                  <td className='d-flex justify-content-center'>
                    <Button key={song.spotifyID} onClick={() => addToPlaylist(song.spotifyID)} variant='success' size='sm'>Add to Playlist</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table >
          : <Alert variant='warning'>
            No songs in your library yet. Please add some through the search above!
          </Alert>
      }
    </>)
}