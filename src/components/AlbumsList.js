import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

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
                        <Col key={album.id} className="col-md-2">
                            <Card className="my-3">
                                <Card.Img variant="top" src={album.coverLink} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                    <Card.Text>{album.artist}</Card.Text>
                                    <LinkContainer to={`/albums/${album.id}`}>
                                        <Button variant="primary">Go To Album</Button>
                                    </LinkContainer>
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