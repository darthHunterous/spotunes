import React from 'react';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import SongTableRow from './SongTableRow';

export default function SongTable(
  { songData,
    setSongData,
    setPlayerSongID,
    setPlayerSongAsPlayed,
    setShowAddToPlaylistModal,
    setAddToPlaylistChosenSong }) {

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
                <th>Plays</th>
                <th className='text-center'>Rating</th>
                <th className='text-center'>Add To Playlist</th>
              </tr>
            </thead >
            <tbody>
              {songData.map((song, index) => (
                <SongTableRow
                  song={song}
                  index={index}
                  spotifyID={song.spotifyID}
                  songData={songData}
                  setSongData={setSongData}
                  setPlayerSongID={setPlayerSongID}
                  setPlayerSongAsPlayed={setPlayerSongAsPlayed}
                  setShowAddToPlaylistModal={setShowAddToPlaylistModal}
                  setAddToPlaylistChosenSong={setAddToPlaylistChosenSong}
                />
              ))}
            </tbody>
          </Table >
          : <Alert variant='warning'>
            No songs here yet. Please add some to start having fun with Spotunes!
          </Alert>
      }
    </>)
}