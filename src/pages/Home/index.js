import React, { useState, useEffect } from "react";

import '../../style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { PlayerIcon } from 'react-player-controls';

function App() {
  const [songData, setSongData] = useState([]);
  const [playerSongID, setPlayerSongID] = useState(['5nDY2KxY4o4kiBxO1tGDGe']);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [searchResultData, setSearchResultData] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value;

    const url = new URL('http://localhost:8888/api/spotify/search');
    const params = { title: query };
    url.search = new URLSearchParams(params).toString();

    const data = await (fetch(url))
      .then((response) => response.json())

    setSearchResultData(data);
    setShowSearchResultModal(true);
  }
  const handleAddToLibrary = (searchResultItemIndex) => {
    setSongData([...songData, { ...searchResultData[searchResultItemIndex], rating: 0 }]);
  }

  const getSongData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setSongData(myJson.songs);
      });
  }

  useEffect(() => {
    getSongData()
  }, [])

  return (
    <>
      <Container className="navbar-player p-0" fluid>
        <Row className="h-100 w-100 m-0">
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-evenly">
            <div className="d-flex align-items-center">
              <PlayerIcon.Previous width={32} height={32} style={{ marginRight: 32 }} />
              <PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }} />
              <PlayerIcon.Next width={32} height={32} style={{ marginRight: 32 }} />
            </div>
            <div className="d-flex align-items-center">
              <Form.Range className="volume-slider" />
            </div>
          </Col>
          <Col className="col-md-4 h-100 p-0">
            <iframe title="Spotify Embedded Player" src={`https://open.spotify.com/embed/track/${playerSongID}`} width="100%" height="100%" frameborder="0"
              allowtransparency="true" allow="encrypted-media" seamless="seamless"></iframe></Col>
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-center align-items-center">
            <Form className="d-flex w-50" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2 shadow-none"
                aria-label="Search"
                name="searchQuery"
              />
              <Button variant="outline-dark" type="submit">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid className="main-content">
        <Row className="h-100">
          <Col md="1 h-100">
            <h6 className="mt-3">Biblioteca</h6>
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1" variant="light">
                Adicionadas Recentemente
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" variant="light">
                Artistas
              </ListGroup.Item>
              <ListGroup.Item action href="#link3" variant="light">
                Álbuns
              </ListGroup.Item>
              <ListGroup.Item action href="#link4" variant="light">
                Músicas
              </ListGroup.Item>
              <ListGroup.Item action href="#link5" variant="light">
                Gêneros
              </ListGroup.Item>
              <ListGroup.Item action href="#link6" variant="light">
                Vídeos
              </ListGroup.Item>
            </ListGroup>

            <h6 className="mt-3">Todas Playlists</h6>
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1" variant="light">
                Mais Reproduzidas
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" variant="light">
                Recentemente Adicionadas
              </ListGroup.Item>
              <ListGroup.Item action href="#link3" variant="light">
                Recentemente Modificadas
              </ListGroup.Item>
              <ListGroup.Item action href="#link4" variant="light">
                Nunca Reproduzidas
              </ListGroup.Item>
              <ListGroup.Item action href="#link5" variant="light">
                Melhores Classificadas
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="pt-5 bg-light song-table h-100">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Length</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {songData.map((song, index) => (
                  <tr onDoubleClick={() => setPlayerSongID(song.spotifyID)}>
                    <td>{index + 1}</td>
                    <td>{song.title}</td>
                    <td>{song.length_string}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.rating}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md="1" className="d-flex flex-column justify-content-between h-100">
            <div>
              <h6 className="mt-3">Playlist Atual</h6>
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1" variant="light">
                  Música
                </ListGroup.Item>
                <ListGroup.Item action href="#link2" variant="light">
                  Música
                </ListGroup.Item>
                <ListGroup.Item action href="#link3" variant="light">
                  Música
                </ListGroup.Item>
                <ListGroup.Item action href="#link4" variant="light">
                  Música
                </ListGroup.Item>
                <ListGroup.Item action href="#link5" variant="light">
                  Música
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div>
              <h6>6 Músicas</h6>
              <h6>Duração: 38 min</h6>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="footer fixed-bottom d-flex align-items-center justify-content-center">
        <p className="m-0">928 itens | 2,5 dias </p>
      </Container>

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
    </>
  );
}

export default App;