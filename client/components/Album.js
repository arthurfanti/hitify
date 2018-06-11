import React from 'react'
import { css } from 'glamor'

const Album = props => {
  if (props.album.results === undefined) return 'carregando...'

  const { items = [] } = props.album.results

  const formatDuration = duration => {
    let seconds = parseInt((duration/1000)%60)
    let minutes = parseInt((duration/(1000*60))%60)

    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds

    return `${minutes}:${seconds}`
  }

  const artistList = artists => {
    const list = artists.reduce((acc, artist) => ([
      ...acc, artist.name
    ]), [])

    return list.join(',')
  }

  return (
    <div {...Album.styles} className={props.visible ? 'album' : 'is-hidden'}>
      <a href='#' onClick={props.handleClose('album')}>⬅</a>
      <ul>
        {items.map((item, i) => (
          <li key={`${item.name}_${i}`}>
            <strong>{item.name}</strong>
            <span>{artistList(item.artists)}</span>
            <span>{formatDuration(item.duration_ms)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

Album.styles = css({
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
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',

    '> li': {
      display: 'flex',
      flex: '1 0 100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: '.5rem 0 1rem',
      borderBottom: '1px solid #444',
      position: 'relative',

      '> strong': {
        display: 'flex',
        flex: '1 0 100%',
        marginBottom: '.25rem',
        color: '#1db954'
      },

      '> span': {
        '&:first-of-type': {
          display: 'block',
          maxWidth: 'calc(100% - 2rem)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },

        '&:last-child': {
          display: 'flex',
          color: '#666'
        }
      }
    }
  }
})

export default Album
