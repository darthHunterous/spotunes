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
import AddToPlaylistModal from "../../components/AddToPlaylistModal";

function App() {
  const [songData, setSongData] = useState([]);
  const [playerSongID, setPlayerSongID] = useState('');
  const [addToPlaylistChosenSong, setAddToPlaylistChosenSong] = useState('');
  const [searchResultData, setSearchResultData] = useState([]);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  const initial_playlists = [
    {
      title: 'Most Played',
      isSmart: true,
      songs: []
    },
    {
      title: 'Recently Added',
      isSmart: true,
      songs: []
    },
    {
      title: 'Recently Modified',
      isSmart: true,
      songs: []
    },
    {
      title: 'Never Played',
      isSmart: true,
      songs: []
    },
    {
      title: 'Best Rated',
      isSmart: true,
      songs: []
    },
    {
      title: 'Play01',
      isSmart: false,
      songs: []
    },
    {
      title: 'Play02',
      isSmart: false,
      songs: []
    },
    {
      title: 'Play03',
      isSmart: false,
      songs: []
    }
  ];
  const [playlists, setPlaylists] = useState(initial_playlists);

  const loadSongData = () => {
    const storageData = localStorage.getItem('songData');

    if (storageData) {
      setSongData(JSON.parse(storageData));
    }
    else {
      setSongData([]);
    }
  }

  useEffect(() => {
    loadSongData()
  }, [])

  useEffect(() => {
    localStorage.setItem('songData', JSON.stringify(songData))
  }, [songData]);

  const libraryTotalLengthInMinutes = () => {
    const totalMilliseconds = songData.reduce((sum, song) => {
      return sum + song.length_ms;
    }, 0)

    return (totalMilliseconds / 60000).toFixed(1);
  }

  return (
    <>
      <Container className="navbar-player p-0" fluid>
        <Row className="h-100 w-100 m-0">
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-evenly border-bottom border-dark border-2">
            <MusicPlayerControls />
          </Col>
          <Col className="col-md-4 h-100 p-0">
            <SpotifyiFrame playerSongID={playerSongID} />
          </Col>
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-center align-items-center border-bottom border-dark border-2">
            <SearchForm setSearchResultData={setSearchResultData} setShowSearchResultModal={setShowSearchResultModal} />
          </Col>
        </Row>
      </Container>

      <Container fluid className="main-content">
        <Row className="h-100">
          <Col md="1" className="h-100 border-end border-dark border-2">
            <ListGroupSection title="Library" items={['Songs', 'Artists', 'Albums', 'Genres', 'Videos', 'Recently Added']} />
            <ListGroupSection title="Playlists" items={initial_playlists.map((playlist) => playlist.title)} />
          </Col>

          <Col className="pt-5 bg-light song-table h-100">
            <SongTable
              songData={songData}
              setPlayerSongID={setPlayerSongID}
              setShowAddToPlaylistModal={setShowAddToPlaylistModal}
              setAddToPlaylistChosenSong={setAddToPlaylistChosenSong}
            />
          </Col>

          <Col md="1" className="d-flex flex-column justify-content-between h-100 border-start border-dark border-2">
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

      <Container fluid className="footer fixed-bottom d-flex align-items-center justify-content-center border-top border-dark border-2">
        <p className="m-0">{songData.length} {songData.length === 1 ? 'song' : 'songs'} | {libraryTotalLengthInMinutes()} minutes </p>
      </Container>

      <SearchResultModal
        searchResultData={searchResultData}
        showSearchResultModal={showSearchResultModal}
        setShowSearchResultModal={setShowSearchResultModal}
        songData={songData}
        setSongData={setSongData}
      />

      <AddToPlaylistModal
        showAddToPlaylistModal={showAddToPlaylistModal}
        setShowAddToPlaylistModal={setShowAddToPlaylistModal}
        addToPlaylistChosenSong={addToPlaylistChosenSong}
        playlists={playlists}
      />
    </>
  );
}

export default App;