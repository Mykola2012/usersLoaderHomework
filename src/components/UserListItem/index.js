import classNames from 'classnames'
import styles from '../UsersLoader/UsersLoader.module.scss'

function UserListItem (props) {
  const { users } = props

  return users.map(u => {
    const genderStyle = classNames(styles.liUser, {
      [styles.genderMale]: u.gender === 'male',
      [styles.genderFemale]: u.gender === 'female'
    })

    return (
      <li className={genderStyle} key={u.login.uuid}>
        <img
          className={styles.imgUser}
          src={u.picture.large}
          alt={`${u.name.first} ${u.name.last}`}
        />
        <span className={styles.emailUser}>{u.email}</span>
      </li>
    )
  })
}

export default UserListItem
