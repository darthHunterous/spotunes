import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function AlbumsList({ sortedAlbumsData }) {
    return (
        <>
            {sortedAlbumsData.length > 0 ?
                <Row className="mx-4">
                    {sortedAlbumsData.map((album) => (
                        <Col className="col-md-2">
                            <Card className="my-3">
                                <Card.Img variant="top" src={album.coverLink} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                    <Card.Text>{album.artist}</Card.Text>
                                    <Button variant="primary" href={`/albums/${album.id}`}>Go To Album</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                :
                <Alert variant='warning'>
                    No albums here yet. Please add some songs to start having fun with Spotunes!
                </Alert>}
        </>
    )
}