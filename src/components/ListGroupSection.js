import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

export default function ListGroupSection({ title, items }) {
  return (
    <>
      <h5 className="mt-3 px-2">{title}</h5>
      <ListGroup className="mb-4" defaultActiveKey="/">
        {items.map((item, index) => (
          <ListGroup.Item action href={item === 'Songs' ? '/' : `#link${index}`} variant="dark">
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}