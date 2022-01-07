import React from 'react';

import ListGroupSection from './ListGroupSection';

export default function LeftSidebar({ playlists, songData, setSongData, setPlaylists }) {
  return (
    <>
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
    </>
  )
}