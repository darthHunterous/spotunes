import React, { useState, useEffect } from "react";

import '../../style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SongTable from '../../components/SongTable';
import SpotifyiFrame from '../../components/SpotifyiFrame';
import ListGroupSection from '../../components/ListGroupSection';
import MusicPlayerControls from '../../components/MusicPlayerControls';
import SearchForm from '../../components/SearchForm';
import SearchResultModal from "../../components/SearchResultModal";

function App() {
  const [songData, setSongData] = useState([]);
  const [playerSongID, setPlayerSongID] = useState('');
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [searchResultData, setSearchResultData] = useState([]);

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
            <MusicPlayerControls />
          </Col>
          <Col className="col-md-4 h-100 p-0">
            <SpotifyiFrame playerSongID={playerSongID} />
          </Col>
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-center align-items-center">
            <SearchForm setSearchResultData={setSearchResultData} setShowSearchResultModal={setShowSearchResultModal} />
          </Col>
        </Row>
      </Container>

      <Container fluid className="main-content">
        <Row className="h-100">
          <Col md="1 h-100">
            <ListGroupSection title="Library" items={['Songs', 'Artists', 'Albums', 'Genres', 'Videos', 'Recently Added']} />
            <ListGroupSection title="Playlists" items={['Most Played', 'Recently Added', 'Recently Modified', 'Never Played', 'Best Rated']} />
          </Col>

          <Col className="pt-5 bg-light song-table h-100">
            <SongTable songData={songData} setPlayerSongID={setPlayerSongID} />
          </Col>

          <Col md="1" className="d-flex flex-column justify-content-between h-100">
            <div>
              <ListGroupSection title="Current Playlist" items={['Song', 'Song', 'Song', 'Song', 'Song', 'Song']} />
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

      <SearchResultModal
        searchResultData={searchResultData}
        showSearchResultModal={showSearchResultModal}
        setShowSearchResultModal={setShowSearchResultModal}
        songData={songData}
        setSongData={setSongData}
      />
    </>
  );
}

export default App;