import React from 'react';
import { PlayerIcon } from 'react-player-controls';
import Form from 'react-bootstrap/Form';

export default function MusicPlayerControls() {
  return (
    <>
      <div className="d-flex align-items-center">
        <PlayerIcon.Previous width={32} height={32} style={{ marginRight: 32 }} />
        <PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }} />
        <PlayerIcon.Next width={32} height={32} style={{ marginRight: 32 }} />
      </div>
      <div className="d-flex align-items-center">
        <Form.Range className="volume-slider" />
      </div>
    </>
  )
}