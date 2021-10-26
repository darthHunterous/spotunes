import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function AddToPlaylistModal({ showAddToPlaylistModal, setShowAddToPlaylistModal, addToPlaylistChosenSong, playlists, setPlaylists }) {
  const [playlistChecked, setPlaylistChecked] = useState({});

  const setCheckboxStatus = () => {
    setPlaylistChecked(playlists.reduce(function (accumulator, playlist) {
      return { ...accumulator, [playlist.id]: playlist.songs.some(song => song.spotifyID === addToPlaylistChosenSong.spotifyID) }
    }, {}))
  }

  const handleToggle = ({ target }) => {
    setPlaylistChecked({
      ...playlistChecked,
      [target.name]: !playlistChecked[target.name]
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Object.entries(playlistChecked).forEach((playlistStatus) => {
      const [key, value] = playlistStatus;

      const found_playlist = playlists.find(playlist => playlist.id === key)
      const found_song = found_playlist.songs.find(song => song.spotifyID === addToPlaylistChosenSong.spotifyID)

      if (value && !found_song) {
        found_playlist.songs.push(addToPlaylistChosenSong)
      }
      else if (!value && found_song) {
        found_playlist.songs = found_playlist.songs.filter(song => song.spotifyID !== addToPlaylistChosenSong.spotifyID)
      }
      setPlaylists(playlists);
    });

    setShowAddToPlaylistModal(false);
  };

  return (
    <Modal
      size="lg"
      show={showAddToPlaylistModal}
      onShow={setCheckboxStatus}
      onHide={() => setShowAddToPlaylistModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Chosen song:
        </Modal.Title>
        <Button className="btn-close" variant="danger" onClick={() => setShowAddToPlaylistModal(false)}></Button>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Row className="d-flex justify-content-center">
          <Col className="col-md-6">
            <Card className="my-3">
              <Card.Img variant="top" src={addToPlaylistChosenSong.albumCover} />
              <Card.Header><b>{addToPlaylistChosenSong.title}</b></Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Artist</b>: {addToPlaylistChosenSong.artist}</ListGroup.Item>
                  <ListGroup.Item><b>Album</b>: {addToPlaylistChosenSong.album}</ListGroup.Item>
                  <ListGroup.Item>
                    <b>Length</b>: {addToPlaylistChosenSong.length_string}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h6>Select which non-smart Playlist(s) to add song to:</h6>
        <ListGroup>
          <Form onSubmit={handleSubmit}>
            {playlists.filter(playlist => !playlist.isSmart).map(playlist =>
            (<ListGroup.Item key={playlist.id}>
              <Form.Check
                type='checkbox'
                label={playlist.title}
                checked={playlistChecked[playlist.id]}
                name={playlist.id}
                onChange={handleToggle}
              />
            </ListGroup.Item>)
            )}
            <Button className="mt-3" variant="success" type="submit">Confirm</Button>
          </Form>
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}