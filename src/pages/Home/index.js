import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';

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
import AlbumsList from "../../components/AlbumsList";
import ArtistsList from "../../components/ArtistsList";

function App() {
  const [songData, setSongData] = useState([]);
  const [filteredSongData, setFilteredSongData] = useState([]);
  const [playerSongID, setPlayerSongID] = useState('');
  const [addToPlaylistChosenSong, setAddToPlaylistChosenSong] = useState('');
  const [searchResultData, setSearchResultData] = useState([]);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [sortedAlbumsData, setSortedAlbumsData] = useState([]);
  const [sortedArtistsData, setSortedArtistsData] = useState([]);

  const initial_playlists = [
    {
      id: '1',
      title: 'Most Played',
      isSmart: true,
      songs: []
    },
    {
      id: '3',
      title: 'Recently Modified',
      isSmart: true,
      songs: []
    },
    {
      id: '4',
      title: 'Never Played',
      isSmart: true,
      songs: []
    },
    {
      id: '5',
      title: 'Best Rated',
      isSmart: true,
      songs: []
    },
    {
      id: '6',
      title: 'Play01',
      isSmart: false,
      songs: []
    },
    {
      id: '7',
      title: 'Play02',
      isSmart: false,
      songs: []
    },
    {
      id: '8',
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

  let current_path = useLocation().pathname;
  let params = useParams();

  useEffect(() => {
    setFilteredSongData([]);

    if (current_path.includes('/playlist')) {
      const playlistID = params['id'];

      const currentPlaylist = playlists.filter((playlist) => {
        return playlist.id === playlistID;
      });

      setFilteredSongData(currentPlaylist[0].songs);
    }
    else if (current_path === '/all') {
      setFilteredSongData(songData);
    }
    else if (current_path === '/albums') {
      const albums = [];

      songData.forEach((song) => {
        if (!albums.some(album => album.id === song.albumID)) {
          albums.push({
            id: song.albumID,
            coverLink: song.albumCover,
            name: song.album,
            artist: song.artist
          });
        }
      });

      albums.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setSortedAlbumsData(albums);
    }
    else if (current_path.includes('/albums')) {
      const albumID = params['id'];

      const currentAlbum = songData.filter((song) => song.albumID === albumID)
      currentAlbum.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1
        : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));

      console.log(currentAlbum)
      setFilteredSongData(currentAlbum);
    }
    else if (current_path === '/artists') {
      const artists = [];

      songData.forEach((song) => {
        if (!artists.some(artist => artist.id === song.artistID)) {
          artists.push({
            id: song.artistID,
            name: song.artist
          });
        }
      });

      artists.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1
        : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
      setSortedArtistsData(artists);
    }
  }, [current_path]);

  const selectedSongsTotalLengthInMinutes = () => {
    const totalMilliseconds = filteredSongData.reduce((sum, song) => {
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
            <ListGroupSection
              title="Library"
              items={['All Songs', 'Artists', 'Albums', 'Genres', 'Recently Added']}
              routes={['/all', '/artists', '/albums', '/genres', '/recent']}
            />
            <ListGroupSection
              title="Playlists"
              items={initial_playlists.map((playlist) => playlist.title)}
              routes={initial_playlists.map((playlist) => `/playlist/${playlist.id}`)}
            />
          </Col>

          <Col className="pt-5 bg-light song-table h-100">
            {current_path === '/albums' ? <AlbumsList sortedAlbumsData={sortedAlbumsData} /> : ''}
            {current_path === '/artists' ? <ArtistsList sortedArtistsData={sortedArtistsData} /> : ''}
            {(current_path != '/albums') && (current_path != '/artists') ?
              <SongTable
                songData={current_path === '/all' ? songData : filteredSongData}
                setPlayerSongID={setPlayerSongID}
                setShowAddToPlaylistModal={setShowAddToPlaylistModal}
                setAddToPlaylistChosenSong={setAddToPlaylistChosenSong}
              />
              : ''}
          </Col>

          <Col md="1" className="d-flex flex-column justify-content-between h-100 border-start border-dark border-2">
            <div>
              <ListGroupSection
                title="Current Playlist"
                items={['Song', 'Song', 'Song', 'Song', 'Song', 'Song']}
                routes={['/song', '/song', '/song', '/song', '/song', '/song']}
              />
            </div>

            <div>
              <h6>6 Músicas</h6>
              <h6>Duração: 38 min</h6>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="footer fixed-bottom d-flex align-items-center justify-content-center border-top border-dark border-2">
        <p className="m-0">{filteredSongData.length} {filteredSongData.length === 1 ? 'song' : 'songs'} | {selectedSongsTotalLengthInMinutes()} minutes </p>
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
        setPlaylists={setPlaylists}
      />
    </>
  );
}

export default App;