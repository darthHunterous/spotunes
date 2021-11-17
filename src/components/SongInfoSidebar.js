import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function SongInfoSidebar({ showInfoSong }) {
  function formatDateString(dateMilliseconds) {
    const date = new Date(dateMilliseconds);

    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    const hh = date.getHours();
    const min = date.getMinutes();

    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  return (
    <>
      <h5 className="mt-3 px-2 mb-3">Current Song:</h5>
      {
        Object.keys(showInfoSong).length !== 0 ?
          <>
            <Card>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Button variant="success" size="sm" className="w-100">
                      + Playlist
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="primary" size="sm" className="w-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                      </svg>
                      &nbsp;
                      Edit
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="danger" size="sm" className="w-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                      &nbsp;
                      Delete
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="my-3">
              <Card.Img variant="top" src={showInfoSong.albumCover} />
              <Card.Header><b>{showInfoSong.title}</b></Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Artist</b>: {showInfoSong.artist}</ListGroup.Item>
                  <ListGroup.Item><b>Album</b>: {showInfoSong.album}</ListGroup.Item>
                  <ListGroup.Item>
                    <b>Length</b>: {showInfoSong.length_string}
                  </ListGroup.Item>
                  <ListGroup.Item><b>Created At</b>: {formatDateString(showInfoSong.createdAt)}</ListGroup.Item>
                  <ListGroup.Item><b>Modified At</b>: {formatDateString(showInfoSong.modifiedAt)}</ListGroup.Item>
                  <ListGroup.Item><b>Plays</b>: {showInfoSong.playCount}</ListGroup.Item>
                  <ListGroup.Item><b>Rating</b>: {showInfoSong.rating}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </>
          :
          <Alert variant='warning'>
            No song selected yet. Click on a song "Show" button to see additional information and actions here!
          </Alert>
      }
    </>
  )
}