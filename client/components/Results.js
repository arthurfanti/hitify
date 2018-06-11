import React from 'react'
import { css } from 'glamor'

const renderResolver = (entity, props) => {
  const { fetchArtist = null, fetchAlbum = null } = props

  const renderArtists = props => fetcher => {
    const { items = [] } = props.results

    const popularity = total => {
      switch (true) {
        case (total <= 30):
          return 'Underground'
        case (total > 30 && total <= 60):
          return 'Regular'
        case (total > 60 && total <= 80):
          return 'Cool'
        case (total > 80):
          return 'Hot'
      }
    }

    return (
      <ul {...Results.styles.thumbs}>
        {items.map((item, i) => (
          <li key={`${item.name}_${i}`} onClick={fetcher(item.id, entity)}>
            <img src={item.images.length ? item.images[0].url : null} />
            <span>
              {item.name}
              <small>{popularity(item.popularity)}</small>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const renderAlbums = props => fetcher => {
    const { items = [] } = props.results
    const renderArtist = artists => {
      return artists.length > 1 ? 'Various Artists' : artists[0].name
    }

    return (
      <ul {...Results.styles.thumbs}>
        {items.map((item, i) => (
          <li key={`${item.name}_${i}`} onClick={fetcher(item.id, entity)}>
            <img src={item.images.length ? item.images[0].url : null} />
            <span>
              {item.name}
              <small>{renderArtist(item.artists)}</small>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const renderTracks = props => fetcher => {
    const { items = [] } = props.results

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
      <ul {...Results.styles.list}>
        {items.map((item, i) => (
          <li key={`${item.name}_${i}`}>
            <strong>{item.name}</strong>
            <span>{artistList(item.artists)}</span>
            <span>{formatDuration(item.duration_ms)}</span>
          </li>
        ))}
      </ul>
    )
  }

  const rF = {
    artist: { func: renderArtists, fetcher: fetchArtist },
    album: { func: renderAlbums, fetcher: fetchAlbum },
    track: { func: renderTracks, fetcher: null }
  }[entity]

  return rF.func(props)(rF.fetcher)
}

const Results = props => {
  if (props.results === undefined) return 'carregando...'
  const { entity, ..._props } = props

  return renderResolver(entity, _props)
}

Results.styles = {
  thumbs: css({
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
        cursor: 'pointer',

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
  }),

  list: css({
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
  })
}

export default Results
