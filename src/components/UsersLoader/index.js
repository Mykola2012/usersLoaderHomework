import React, { Component } from 'react'
import loadUsers from '../../api'

class UsersLoader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: Number(window.localStorage.getItem('page')) || 1
    }
  }

  load = () => {
    const { currentPage } = this.state

    this.setState({ isFetching: true })

    loadUsers({ page: currentPage })
      .then(({ results }) => this.setState({ users: results }))
      .catch(e => {
        this.setState({ error: e })
      })
      .finally(() => {
        this.setState({ isFetching: false })
      })
  }

  componentDidMount () {
    this.load()
  }

  componentDidUpdate (prevProps, prevState) {
    const { currentPage } = this.state

    if (prevState.currentPage !== currentPage) {
      window.localStorage.setItem('page', currentPage)
      this.load()
    }
  }

  increment = () => {
    const { currentPage } = this.state
    this.setState({ currentPage: currentPage + 1 })
  }

  decrement = () => {
    const { currentPage } = this.state
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 })
    }
  }

  render () {
    const { users, error, isFetching, currentPage } = this.state

    return (
      <>
        <p>{currentPage}</p>
        <button onClick={this.decrement}>previous page</button>
        <button onClick={this.increment}>next page</button>
        {error && <div style={{ color: 'red' }}>!!!ERROR!!!</div>}
        {isFetching && <div>Loading, please wait...</div>}
        <ul>
          {users.map(u => (
            <li key={u.login.uuid}>{JSON.stringify(u)}</li>
          ))}
        </ul>
      </>
    )
  }
}
export default UsersLoader
