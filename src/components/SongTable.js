import React, { useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import SongTableRow from './SongTableRow';
import PlaylistEditFormModal from './PlaylistEditFormModal';

export default function SongTable(
  { songData,
    playlists,
    setPlaylists,
    setSongData,
    playerSongID,
    setPlayerSongID,
    setPlayerSongAsPlayed,
    setShowAddToPlaylistModal,
    setAddToPlaylistChosenSong }) {

  const params = useParams();
  const history = useHistory();
  const [showPlaylistEditFormModal, setShowPlaylistEditFormModal] = useState(false);

  function handleEditButton() {
    setShowPlaylistEditFormModal(true);
  }

  function handleDeleteButton() {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      const adjustedPlaylists = playlists.filter((playlist) => playlist.id !== params.id);
      setPlaylists(adjustedPlaylists);

      history.push('/all');
    }
  }

  return (
    <>
      {
        useLocation().pathname.includes('/playlist')
          ?
          <div className="mb-4">
            <h1 class="display-4 mb-3">Playlist Content:</h1>
            <Button className="me-3" variant="primary" onClick={() => handleEditButton()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              &nbsp;Edit Playlist
            </Button>
            <Button variant="danger" onClick={() => handleDeleteButton()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
              &nbsp;Delete Playlist
            </Button>
          </div>
          : ''
      }
      {
        (songData.length > 0)
          ?
          <Table striped bordered hover responsive>
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
                  playerSongID={playerSongID}
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
      <PlaylistEditFormModal
        showPlaylistEditFormModal={showPlaylistEditFormModal}
        setShowPlaylistEditFormModal={setShowPlaylistEditFormModal}
        playlists={playlists}
        setPlaylists={setPlaylists}
      />
    </>)
}