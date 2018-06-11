import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import ResultsComponent from '../components/Results'
import ArtistComponent from '../components/Artist'
import AlbumComponent from '../components/Album'
import { css } from 'glamor'
import { setToken } from '../actions/session'
import { fetchArtist, fetchAlbum } from '../actions/search'

class App extends Component {
  state = {
    artist: {
      hasContent: false
    },
    album: {
      hasContent: false
    },
  }

  componentDidMount() {
    const token = this.getHashParams()['access_token']
    this.props.setToken(token)
  }

  getHashParams() {
    var hashParams = {}
    var e, r = /([^&=]+)=?([^&]*)/g,
    q = window.location.search.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  closeDetails = entity => event => {
    this.setState(prevState => ({ ...prevState, [entity]: { hasContent: false } }))
  }

  fetchArtist = id => {
    this.setState(prevState => ({ ...prevState, hasContent: true }), () => {
      this.props.fetchArtist(id)
    })
  }

  fetchFunction = (id, entity) => event => {
    event.preventDefault()

    const func = entity[0].toUpperCase() + entity.substring(1)
    this.setState(prevState => ({ [entity]: { hasContent: true } }), () => {
      this.props[`fetch${func}`](id)
    })
  }

  render() {
    const { artist = {}, album = {} } = this.state
    const hasContent = (artist.hasContent || album.hasContent)

    return (
      <div  {...App.styles} className={hasContent ? 'App has-content' : 'App'}>
        <section>
          <Search />
          <ResultsComponent
            results={this.props.results}
            entity={this.props.entity}
            fetchArtist={this.fetchFunction}
            fetchAlbum={this.fetchFunction}
          />
        </section>
        <ArtistComponent
          handleClose={this.closeDetails}
          artist={this.props.artist}
          visible={artist.hasContent}
        />
        <AlbumComponent
          handleClose={this.closeDetails}
          album={this.props.album}
          visible={album.hasContent}
        />
      </div>
    )
  }
}

App.styles = css({
  display: 'flex',
  alignItems: 'flex-start',
  transition: 'transform 350ms ease-out',

  '&.has-content': {
    transform: 'translateX(-100vw)'
  },

  '& section': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  }
})

const mapStateToProps = state => ({
  token: state.session.token,
  results: state.search.results,
  artist: state.search.artist,
  album: state.search.album,
  entity: state.search.entity
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  fetchArtist: id => dispatch(fetchArtist(id)),
  fetchAlbum: id => dispatch(fetchAlbum(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
