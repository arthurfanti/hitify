import React from 'react'
import { css } from 'glamor'

const Search = props => {
  const { selected, entities, handleChange, handleClick, setRef } = props

  return (
    <div {...Search.styles}>
      <input
        type="text"
        ref={setRef}
        onChange={handleChange}
        placeholder="Find yourself some treat :)"
      />
      <ul>
        {entities.map(({ label, value }) => (
          <li
            key={label}
            onClick={handleClick(value)}
            className={value === selected ? 'active' : null}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

Search.styles = css({
  '& input': {
    width: '100vw',
    color: '#EEE',
    outline: 0,
    backgroundColor: 'transparent',
    border: 0,
    padding: '1rem',
    fontSize: '3.5rem',
    fontWeight: 800,
    opacity: 0.35,
    transition: 'opacity 150ms ease-out',

    '&:focus': {
      opacity: 1
    }
  },

  '& ul': {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: '0 1rem',
    listStyle: 'none',
    flexWrap: 'wrap',
    width: '100vw',
    height: '2rem',

    '> li': {
      padding: '0 1rem',
      marginRight: '2rem',
      backgroundColor: '#222',
      borderRadius: '2rem',
      lineHeight: '2rem',
      transition: 'background-color 150ms ease-out',
      cursor: 'pointer',

      '&.active': {
        backgroundColor: '#1db954'
      }
    }
  }
})

export default Search
