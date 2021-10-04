import React from 'react';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SearchResultModal({ searchResultData, showSearchResultModal, setShowSearchResultModal, songData, setSongData }) {
  const handleAddToLibrary = (searchResultItemIndex) => {
    setSongData([...songData, { ...searchResultData[searchResultItemIndex], rating: 0 }]);
  }

  return (
    <Modal
      size="lg"
      show={showSearchResultModal}
      onHide={() => setShowSearchResultModal(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Search Results (10):
        </Modal.Title>
        <Button className="btn-close" variant="danger" onClick={() => setShowSearchResultModal(false)}></Button>
      </Modal.Header>
      <Modal.Body className="px-4">
        <ListGroup>
          <Row>
            {searchResultData.map((song, index) => (
              <Col className="col-md-6">
                <Card className="my-3">
                  <Card.Img variant="top" src={song.albumCover} />
                  <Card.Header><b>{song.title}</b></Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item><b>Artist</b>: {song.artist}</ListGroup.Item>
                      <ListGroup.Item><b>Album</b>: {song.album}</ListGroup.Item>
                      <ListGroup.Item>
                        <b>Length</b>: {song.length_string}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={() => handleAddToLibrary(index)}>
                      Add To Library
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}