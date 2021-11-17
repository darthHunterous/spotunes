import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';

import '../../style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import SongTable from '../../components/SongTable';
import SpotifyiFrame from '../../components/SpotifyiFrame';
import ListGroupSection from '../../components/ListGroupSection';
import MusicPlayerControls from '../../components/MusicPlayerControls';
import SearchForm from '../../components/SearchForm';
import SearchResultModal from "../../components/SearchResultModal";
import AddToPlaylistModal from "../../components/AddToPlaylistModal";
import AlbumsList from "../../components/AlbumsList";
import ArtistsList from "../../components/ArtistsList";
import GenresList from "../../components/GenresList";

function App() {
  const [songData, setSongData] = useState([]);
  const [filteredSongData, setFilteredSongData] = useState([]);
  const [playerSongID, setPlayerSongID] = useState('');
  const [playerSongAsPlayed, setPlayerSongAsPlayed] = useState(false);
  const [addToPlaylistChosenSong, setAddToPlaylistChosenSong] = useState('');
  const [searchResultData, setSearchResultData] = useState([]);
  const [showSearchResultModal, setShowSearchResultModal] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [sortedAlbumsData, setSortedAlbumsData] = useState([]);
  const [sortedArtistsData, setSortedArtistsData] = useState([]);
  const [sortedGenresData, setSortedGenresData] = useState([]);
  const [showInfoSong, setShowInfoSong] = useState({});

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
    loadSongData();
  }, [])

  useEffect(() => {
    localStorage.setItem('songData', JSON.stringify(songData));
    setFilteredSongData(songData);
  }, [songData]);

  let current_path = useLocation().pathname;
  let params = useParams();

  useEffect(() => {
    setFilteredSongData([]);

    if (current_path.includes('/playlist')) {
      const playlistID = params['id'];

      if (playlistID === '1') {
        const currentPlaylist = songData.filter((song) => song.playCount > 0);
        currentPlaylist.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        currentPlaylist.sort((a, b) => (a.playCount < b.playCount) ? 1 : ((b.playCount < a.playCount) ? -1 : 0));
        setFilteredSongData(currentPlaylist.slice(0, 25));
      }
      else if (playlistID === '3') {
        const currentDate = new Date();
        const ONE_DAY = 24 * 60 * 60 * 1000;

        const recentlyModifiedSongs = songData.filter((song) => currentDate - song.modifiedAt < ONE_DAY);

        setFilteredSongData(recentlyModifiedSongs);
      }
      else if (playlistID === '4') {
        const currentPlaylist = songData.filter((song) => song.playCount === 0);
        currentPlaylist.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        setFilteredSongData(currentPlaylist);
      }
      else if (playlistID === '5') {
        const maxRating = songData.reduce((max, song) => max = max < song.rating ? song.rating : max, 0);

        if (maxRating) {
          const currentPlaylist = songData.filter((song) => song.rating === maxRating);
          setFilteredSongData(currentPlaylist);
        }
      }
      else {
        const currentPlaylist = playlists.filter((playlist) => {
          return playlist.id === playlistID;
        });
        setFilteredSongData(currentPlaylist[0].songs);
      }
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

      setFilteredSongData(currentAlbum);
    }
    else if (current_path === '/artists') {
      const artists = [];

      songData.forEach((song) => {
        if (!artists.some(artist => artist.id === song.artistID)) {
          artists.push({
            id: song.artistID,
            name: song.artist,
            image: song.artistImageURL
          });
        }
      });

      artists.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1
        : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
      setSortedArtistsData(artists);
    }
    else if (current_path.includes('/artists')) {
      const artistID = params['id'];

      const currentArtistSongs = songData.filter((song) => song.artistID === artistID)
      currentArtistSongs.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1
        : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));

      setFilteredSongData(currentArtistSongs);
    }
    else if (current_path === '/genres') {
      let genres = [];

      songData.forEach(song => genres = genres.concat(song.genres));

      const sortedGenres = Array.from(new Set(genres)).sort();
      setSortedGenresData(sortedGenres);
    }
    else if (current_path.includes('/genres')) {
      const genre = params['identifier'].replace('-', ' ');

      const currentGenreSongs = songData.filter((song) => song.genres.includes(genre))
      currentGenreSongs.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1
        : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));

      setFilteredSongData(currentGenreSongs);
    }
    else if (current_path === '/recent') {
      const currentDate = new Date();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      const recentlyAddedSongs = songData.filter((song) => currentDate - song.createdAt < ONE_DAY);

      setFilteredSongData(recentlyAddedSongs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_path]);

  const selectedSongsTotalLengthInMinutes = () => {
    const totalMilliseconds = filteredSongData.reduce((sum, song) => {
      return sum + song.length_ms;
    }, 0)

    return (totalMilliseconds / 60000).toFixed(1);
  }

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
      <Container className="navbar-player p-0" fluid>
        <Row className="h-100 w-100 m-0">
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-center border-bottom border-dark border-2">
            <MusicPlayerControls
              playerSongID={playerSongID}
              setPlayerSongID={setPlayerSongID}
              filteredSongData={filteredSongData}
            />
          </Col>
          <Col className="col-md-4 h-100 p-0">
            <SpotifyiFrame
              playerSongID={playerSongID}
              playerSongAsPlayed={playerSongAsPlayed}
              setPlayerSongAsPlayed={setPlayerSongAsPlayed}
              songData={songData}
              setSongData={setSongData}
            />
          </Col>
          <Col className="col-md-4 h-100 p-0 d-flex justify-content-center align-items-center border-bottom border-dark border-2">
            <SearchForm setSearchResultData={setSearchResultData} setShowSearchResultModal={setShowSearchResultModal} />
          </Col>
        </Row>
      </Container>

      <Container fluid className="main-content">
        <Row className="h-100">
          <Col md="1" className="h-100 border-end border-dark border-2 sidebar">
            <ListGroupSection
              title="Library"
              items={['All Songs', 'Artists', 'Albums', 'Genres', 'Recently Added']}
              keys={['/all', '/artists', '/albums', '/genres', '/recent']}
              routes={['/all', '/artists', '/albums', '/genres', '/recent']}
              songData={songData}
              setSongData={setSongData}
              playlists={playlists}
            />
            <ListGroupSection
              title="Playlists"
              items={playlists.map((playlist) => playlist.title)}
              keys={playlists.map((playlist) => playlist.id)}
              routes={playlists.map((playlist) => `/playlist/${playlist.id}`)}
              songData={songData}
              setSongData={setSongData}
              playlists={playlists}
              setPlaylists={setPlaylists}
            />
          </Col>

          <Col className="pt-5 bg-light song-table h-100">
            {current_path === '/albums' ? <AlbumsList sortedAlbumsData={sortedAlbumsData} /> : ''}
            {current_path === '/artists' ? <ArtistsList sortedArtistsData={sortedArtistsData} /> : ''}
            {current_path === '/genres' ? <GenresList sortedGenresData={sortedGenresData} /> : ''}
            {(current_path !== '/albums') && (current_path !== '/artists') && (current_path !== '/genres') ?
              <SongTable
                songData={current_path === '/all' ? songData : filteredSongData}
                playlists={playlists}
                setPlaylists={setPlaylists}
                setSongData={setSongData}
                playerSongID={playerSongID}
                setPlayerSongID={setPlayerSongID}
                showInfoSong={showInfoSong}
                setShowInfoSong={setShowInfoSong}
                setPlayerSongAsPlayed={setPlayerSongAsPlayed}
                setShowAddToPlaylistModal={setShowAddToPlaylistModal}
                setAddToPlaylistChosenSong={setAddToPlaylistChosenSong}
              />
              : ''}
          </Col>

          <Col md="1" className="d-flex flex-column h-100 border-start border-dark border-2 sidebar">
            <h5 className="mt-3 px-2 mb-3">Current Song:</h5>

            {Object.keys(showInfoSong).length !== 0 ?
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
          </Col>
        </Row>
      </Container>

      <Container fluid className="footer fixed-bottom d-flex align-items-center justify-content-center border-top border-dark border-2">
        {(current_path === '/artists') ?
          <p className="m-0">
            {sortedArtistsData.length} {sortedArtistsData.length === 1 ? 'artist' : 'artists'}
          </p>
          : ''}
        {(current_path === '/albums') ?
          <p className="m-0">
            {sortedAlbumsData.length} {sortedAlbumsData.length === 1 ? 'album' : 'albums'}
          </p>
          : ''}
        {(current_path === '/genres') ?
          <p className="m-0">
            {sortedGenresData.length} {sortedGenresData.length === 1 ? 'genre' : 'genres'}
          </p>
          : ''}
        {(current_path !== '/albums') && (current_path !== '/artists') && (current_path !== '/genres') ?
          <p className="m-0">
            {filteredSongData.length} {filteredSongData.length === 1 ? 'song' : 'songs'} | {selectedSongsTotalLengthInMinutes()} minutes
          </p>
          : ''}
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