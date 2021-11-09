import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PlaylistEditFormModal({ showPlaylistEditFormModal, setShowPlaylistEditFormModal, playlists, setPlaylists }) {
  const [currentPlaylistTitle, setCurrentPlaylistTitle] = useState('');

  const { id } = useParams();
  const currentPlaylist = playlists.find((playlist) => playlist.id === id);

  useEffect(() => {
    setCurrentPlaylistTitle(currentPlaylist?.title);
  }, [currentPlaylist]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTitle = event.target.elements.title.value;

    const playlistIndex = playlists.findIndex(playlist => playlist.id === id);
    playlists[playlistIndex].title = newTitle;

    setPlaylists([...playlists]);
    setShowPlaylistEditFormModal(false);
  }

  return (
    <Modal
      size="lg"
      show={showPlaylistEditFormModal}
      onHide={() => setShowPlaylistEditFormModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Edit playlist:
        </Modal.Title>
        <Button className="btn-close" variant="danger" onClick={() => setShowPlaylistEditFormModal(false)}></Button>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter playlist name"
              value={currentPlaylistTitle}
              onChange={(e) => {
                setCurrentPlaylistTitle(e.target.value);
              }}
              name="title"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}