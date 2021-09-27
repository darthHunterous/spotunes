import React from 'react';

import Table from 'react-bootstrap/Table';

export default function SongTable({ songData, setPlayerSongID }) {

  return (<Table striped bordered hover responsive>
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
  </Table>)
}