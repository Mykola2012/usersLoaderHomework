import styles from '../UsersLoader/UsersLoader.module.scss'

function ControlPanel (props) {
  const { increment, decrement, currentUsers, handleResultsChange } = props

  return (
    <>
      <button className={styles.btnCurrentPage} onClick={decrement}>
        previous page
      </button>
      <button className={styles.btnCurrentPage} onClick={increment}>
        next page
      </button>

      <label className={styles.labelCurrentUsers}>
        <span>Number of users:</span>
        <input
          className={styles.inputCurrentUsers}
          type='number'
          value={currentUsers}
          name='currentUsers'
          onChange={handleResultsChange}
          autoFocus
        ></input>
      </label>
    </>
  )
}

export default ControlPanel
