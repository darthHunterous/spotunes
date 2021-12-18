import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SongInfoEditFormModal({ showSongInfoEditFormModal, setShowSongInfoEditFormModal, showInfoSong, songData, setSongData }) {
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [currentSongArtist, setCurrentSongArtist] = useState('');
  const [currentSongAlbum, setCurrentSongAlbum] = useState('');

  useEffect(() => {
    setCurrentSongTitle(showInfoSong.title);
    setCurrentSongArtist(showInfoSong.artist);
    setCurrentSongAlbum(showInfoSong.album);
  }, [showInfoSong]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentSongIndex = songData.findIndex((song) => song.spotifyID === showInfoSong.spotifyID);

    const newTitle = event.target.elements.title.value;
    const newArtist = event.target.elements.artist.value;
    const newAlbum = event.target.elements.album.value;

    const dateNow = new Date().valueOf();

    songData[currentSongIndex].title = newTitle;
    songData[currentSongIndex].artist = newArtist;
    songData[currentSongIndex].album = newAlbum;
    songData[currentSongIndex].modifiedAt = dateNow;

    setSongData([...songData]);
    setShowSongInfoEditFormModal(false);
  }

  return (
    <Modal
      size="lg"
      show={showSongInfoEditFormModal}
      onHide={() => setShowSongInfoEditFormModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Edit song info:
        </Modal.Title>
        <Button className="btn-close" variant="danger" onClick={() => setShowSongInfoEditFormModal(false)}></Button>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group className="mb-3" controlId="formSongTitle">
            <Form.Label>Song Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter song title"
              value={currentSongTitle}
              onChange={(e) => {
                setCurrentSongTitle(e.target.value);
              }}
              name="title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formArtistName">
            <Form.Label>Artist Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter artist name"
              value={currentSongArtist}
              onChange={(e) => {
                setCurrentSongArtist(e.target.value);
              }}
              name="artist"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAlbumTitle">
            <Form.Label>Album Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter album title"
              value={currentSongAlbum}
              onChange={(e) => {
                setCurrentSongAlbum(e.target.value);
              }}
              name="album"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal >
  )
}