import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FooterStats({ sortedArtistsData, sortedAlbumsData, sortedGenresData, filteredSongData }) {
  let current_path = useLocation().pathname;

  const selectedSongsTotalLengthInMinutes = () => {
    const totalMilliseconds = filteredSongData.reduce((sum, song) => {
      return sum + song.length_ms;
    }, 0)

    return (totalMilliseconds / 60000).toFixed(1);
  }

  return (
    <>
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
    </>
  )
}
