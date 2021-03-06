import React from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function SearchForm({ setSearchResultData, setShowSearchResultModal }) {
  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value;

    if (!query) {
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL || 'https://spotunes-server.herokuapp.com';
    const url = new URL(`${API_URL}/api/spotify/search`);
    const params = { name: query, type: 'track' };
    url.search = new URLSearchParams(params).toString();

    const data = await (fetch(url))
      .then((response) => response.json())

    setSearchResultData(data);
    setShowSearchResultModal(true);
  }

  return (
    <Form className="d-flex w-50" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Add new song..."
        className="mr-2 shadow-none"
        aria-label="Search"
        name="searchQuery"
      />
      <Button variant="dark" type="submit">Search</Button>
    </Form>
  )
}