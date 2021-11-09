import React from 'react';
import uuid from 'react-uuid';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PlaylistCreationFormModal({ showPlaylistCreationFormModal, setShowPlaylistCreationFormModal, playlists, setPlaylists }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;

    const newPlaylist = {
      id: uuid(),
      title: name,
      isSmart: false,
      songs: []
    };

    playlists = [newPlaylist].concat(playlists);
    setPlaylists([...playlists]);
    setShowPlaylistCreationFormModal(false);
  }

  return (
    <Modal
      size="lg"
      show={showPlaylistCreationFormModal}
      onHide={() => setShowPlaylistCreationFormModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Creating new playlist:
        </Modal.Title>
        <Button className="btn-close" variant="danger" onClick={() => setShowPlaylistCreationFormModal(false)}></Button>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control type="text" placeholder="Enter playlist name" name="name" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}