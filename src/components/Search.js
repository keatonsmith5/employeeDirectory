import React from 'react';

const Search = (props) => {
  return (
    <input
      onChange={props.handleInputChange}
      value={props.search}
      name='search'
      type='search'
      className='form-control'
      placeholder='Search'
    />
  );
};

export default Search;