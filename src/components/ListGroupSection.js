import React, { useRef, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import PlaylistCreationFormModal from './PlaylistCreationFormModal';

export default function ListGroupSection({ title, items, keys, routes, songData, setSongData, playlists, setPlaylists }) {
  const inputRef = useRef(null);
  const [showPlaylistCreationFormModal, setShowPlaylistCreationFormModal] = useState(false);

  const handleClick = (e) => {
    const items = document.querySelectorAll('.list-group-item-to-activate');

    items.forEach((item) => {
      item.style.backgroundColor = '#d3d3d4';
      item.style.borderColor = 'rgba(0, 0, 0, 0.125)';
      item.style.color = 'rgb(20, 22, 25)';
    })
    e.target.style.backgroundColor = '#141619';
    e.target.style.color = 'rgb(255, 255, 255)';
  }

  const handleMouseEnter = (e) => {
    const color = e.target.style.backgroundColor;

    if (color && color !== 'rgb(20, 22, 25)') {
      e.target.style.backgroundColor = 'rgb(190, 190, 191)';
    }
  }

  const handleMouseLeave = (e) => {
    const color = e.target.style.backgroundColor;

    if (color === 'rgb(190, 190, 191)') {
      e.target.style.backgroundColor = '#d3d3d4';
    }
  }

  const handleExport = () => {
    const fileData = JSON.stringify(songData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = 'library.json';
    link.href = url;
    link.click();
  }

  const handleImportClick = () => {
    inputRef.current?.click();
  }

  const handleImportUpload = () => {
    const files = inputRef.current?.files ? inputRef.current.files : null;

    const fr = new FileReader();

    fr.onload = function (e) {
      const result = JSON.parse(e.target.result);
      setSongData(result);
    }

    fr.readAsText(files.item(0));
  }

  const handlePlaylistCreate = () => {
    setShowPlaylistCreationFormModal(true);
  }

  return (
    <>
      <h5 className="mt-3 px-2">{title}</h5>

      {title === "Library" ?
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={() => handleExport()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
            <span>&nbsp;Export</span>
          </Button>
          <input
            ref={inputRef}
            onChange={() => handleImportUpload()}
            className="d-none"
            type="file"
          />
          <Button className="mb-2" variant="primary" onClick={() => handleImportClick()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            <span>&nbsp;Import</span>
          </Button>
        </div >
        :
        <div className="d-grid gap-2">
          <Button className="mb-2" variant="success" onClick={() => handlePlaylistCreate()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span>&nbsp;New Playlist</span>
          </Button>
        </div >
      }
      <ListGroup className="mb-4" defaultActiveKey="/all"
        onClick={handleClick}
      >
        {items.map((item, index) => (
          <LinkContainer key={keys[index]} to={routes[index]}>
            <ListGroup.Item
              action
              variant="dark"
              className="list-group-item-to-activate"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item}
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </ListGroup>

      <PlaylistCreationFormModal
        showPlaylistCreationFormModal={showPlaylistCreationFormModal}
        setShowPlaylistCreationFormModal={setShowPlaylistCreationFormModal}
        playlists={playlists}
        setPlaylists={setPlaylists}
      />
    </>
  )
}