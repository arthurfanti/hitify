import React from 'react'
import { css } from 'glamor'

const Artist = props => {
  if (props.artist.results === undefined) return 'carregando...'

  const { items = [] } = props.artist.results
  const renderArtist = artists => {
    return artists.length > 1 ? 'Various Artists' : artists[0].name
  }

  return (
    <div {...Artist.styles} className={props.visible ? 'artist' : 'is-hidden'}>
      <a href='#' onClick={props.handleClose('artist')}>⬅</a>
      <ul>
        {items.map((item, i) => (
          <li key={`${item.name}_${i}`}>
            <img src={item.images.length ? item.images[0].url : null} />
            <span>
              {item.name}
              <small>{renderArtist(item.artists)}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

Artist.styles = css({
  display: 'flex',
  flexWrap: 'wrap',
  flex: '0 0 100vw',

  '&.is-hidden': {
    display: 'none'
  },

  '> a': {
    fontFamily: '"Work Sans", sans-serif',
    color: 'white',
    display: 'flex',
    textDecoration: 'none',
    padding: '0 2rem',
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: '3rem',
    margin: '1rem 0 0',
    transition: 'color 150ms ease-out',

    '&:hover': {
      color: '#1db954'
    }
  },

  '& ul': {
    margin: '0',
    padding: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

    '> li': {
      display: 'flex',
      flex: '0 1 300px',
      overflow: 'hidden',
      height: '300px',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      position: 'relative',

      '> img': {
        maxWidth: '100%',
        borderRadius: '100%',
        width: '280px',
        height: '280px'
      },

      '> span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,.75)',
        borderRadius: '100%',
        textAlign: 'center',
        padding: '.5rem',
        fontSize: '3rem',
        fontWeight: 800,
        letterSpacing: '-1px',
        wordWrap: 'break-word',
        lineHeight: '3rem',
        opacity: 0,
        transition: 'opacity 150ms ease-out',

        '& small': {
          fontSize: '.875rem',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '10.5rem',
          overflow: 'hidden',
          display: 'block',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0 1rem',
          background: '#222',
          borderRadius: '2rem',
          lineHeight: '2rem',
          bottom: '2rem'
        }
      },

      '&:hover': {
        '> span': {
          opacity: 1
        }
      }
    }
  }
})

export default Artist
