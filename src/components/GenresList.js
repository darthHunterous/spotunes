import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const capitalizeString = (stringToCapitalize) => {
    const words = stringToCapitalize.split(' ');
    const uppercaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    return uppercaseWords.join(' ')
}

export default function GenresList({ sortedGenresData }) {
    return (
        <>
            {sortedGenresData.length > 0 ?
                <Row className="mx-4">
                    {sortedGenresData.map((genre) => (
                        <Col key={genre} className="col-md-2">
                            <Card className="my-3">
                                <Card.Body>
                                    <Card.Title>{capitalizeString(genre)}</Card.Title>
                                    <LinkContainer to={`/genres/${genre.replace(' ', '-')}`}>
                                        <Button variant="primary">Songs of this Genre</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                :
                <Alert variant='warning'>
                    No genres here yet. Please add some songs to start having fun with Spotunes!
                </Alert>}
        </>
    )
}