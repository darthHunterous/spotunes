import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function ArtistsList({ sortedArtistsData }) {
    return (
        <>
            {sortedArtistsData.length > 0 ?
                <Row className="mx-4">
                    {sortedArtistsData.map((artist) => (
                        <Col className="col-md-2">
                            <Card className="my-3">
                                <Card.Img variant="top" src={artist.image} />
                                <Card.Body>
                                    <Card.Title>{artist.name}</Card.Title>
                                    <LinkContainer to={`/artists/${artist.id}`}>
                                        <Button variant="primary">Go To Artist Songs</Button>
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