import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchComponent from '../components/Search'
import { fetchResults } from '../actions/search'

class Search extends Component {
  timer = null
  entities = [
    { label: 'Artista', value: 'artist' },
    { label: 'Álbum', value: 'album' },
    { label: 'Música', value: 'track' }
  ]
  state = {
    selected: 'artist'
  }

  componentDidMount() {
    this.input.focus()
  }

  handleChange = event => {
    const { value } = event.target
    const { selected } = this.state

    if (value === '') return

    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.props.fetchResults(value, selected), 1000)
  }

  handleClick = entity => event => {
    this.setState(prevState => ({ ...prevState, selected: entity }))
  }

  render() {
    const props = {
      selected: this.state.selected,
      entities: this.entities,
      handleChange: this.handleChange,
      handleClick: this.handleClick,
      setRef: input => this.input = input
    }

    return (
      <SearchComponent {...props} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchResults: (term, entity) => dispatch(fetchResults(term, entity))
})

export default connect(null, mapDispatchToProps)(Search)
