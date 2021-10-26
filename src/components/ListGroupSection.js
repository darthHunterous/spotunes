import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import ListGroup from 'react-bootstrap/ListGroup';

export default function ListGroupSection({ title, items, routes }) {
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

  return (
    <>
      <h5 className="mt-3 px-2">{title}</h5>
      <ListGroup className="mb-4" defaultActiveKey="/all"
        onClick={handleClick}
      >
        {items.map((item, index) => (
          <LinkContainer key={item} to={routes[index]}>
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
    </>
  )
}