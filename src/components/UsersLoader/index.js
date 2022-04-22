import classNames from 'classnames'
import React, { Component } from 'react'
import loadUsers from '../../api'
import styles from './UsersLoader.module.scss'

class UsersLoader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: Number(window.localStorage.getItem('page')) || 1,
      currtentUsers: Number('5')
    }
  }

  load = () => {
    const { currentPage, currtentUsers } = this.state

    this.setState({ isFetching: true })

    loadUsers({ page: currentPage, results: currtentUsers })
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
    const { currentPage, currtentUsers } = this.state

    if (prevState.currentPage !== currentPage) {
      window.localStorage.setItem('page', currentPage)
      this.load()
    }

    if (prevState.currtentUsers !== currtentUsers) {
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

  handleResultsChange = ({ target: { value } }) => {
    this.setState({
      currtentUsers: value
    })
  }

  render () {
    const { users, error, isFetching, currentPage, currentUsers } = this.state

    return (
      <main className={styles.mainComtainer}>
        <p className={styles.currentPage}>{currentPage}</p>

        <div className={styles.btnWrapper}>
          <button className={styles.btnCurrentPage} onClick={this.decrement}>
            previous page
          </button>
          <button className={styles.btnCurrentPage} onClick={this.increment}>
            next page
          </button>
        </div>

        <label className={styles.labelCurrentUsers}>
          <span>Number of users:</span>
          <input
            className={styles.inputCurrentUsers}
            type='number'
            value={currentUsers}
            name='currentUsers'
            onChange={this.handleResultsChange}
            autoFocus
          ></input>
        </label>

        {error && <div style={{ color: 'red' }}>!!!ERROR!!!</div>}
        {isFetching && <div>Loading, please wait...</div>}

        <ul className={styles.ulUserWrapper}>
          {users.map(u => (
            <li
              className={classNames(styles.liUser, {
                [styles.genderMale]: u.gender === 'male',
                [styles.genderFemale]: u.gender === 'female'
              })}
              key={u.login.uuid}
            >
              <img
                className={styles.imgUser}
                src={u.picture.large}
                alt={`${u.name.first} ${u.name.last}`}
              />
              <span className={styles.emailUser}>{u.email}</span>
            </li>
          ))}
        </ul>
      </main>
    )
  }
}
export default UsersLoader
