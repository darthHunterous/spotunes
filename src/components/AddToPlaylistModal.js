import React from 'react';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function AddToPlaylistModal({ showAddToPlaylistModal, setShowAddToPlaylistModal, addToPlaylistChosenSong, playlists }) {
  return (
    <Modal
      size="lg"
      show={showAddToPlaylistModal}
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
        <h6>Select which Playlist(s) to add song to:</h6>
        <ListGroup>
          <Form>
            {playlists.filter(playlist => !playlist.isSmart).map(playlist =>
              (<ListGroup.Item>{playlist.title}</ListGroup.Item>)
            )}
          </Form>
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}