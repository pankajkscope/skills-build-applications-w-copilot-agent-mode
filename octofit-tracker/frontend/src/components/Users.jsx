import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const usersEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiList('users', usersEndpoint)
      .then((data) => {
        if (isMounted) {
          setUsers(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">{error}</div>
  }

  return (
    <div className="data-panel">
      <div className="panel-heading">
        <h1>Users</h1>
        <span className="metric">{users.length} profiles</span>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Team</th>
              <th>Weekly Goal</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-capitalize">{user.role}</td>
                <td>{user.teamName}</td>
                <td>{user.weeklyGoalMinutes} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
