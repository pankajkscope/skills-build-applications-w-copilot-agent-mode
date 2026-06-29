import { useEffect, useState } from 'react'
import { fetchApiList } from '../api'

const teamsEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiList('teams', teamsEndpoint)
      .then((data) => {
        if (isMounted) {
          setTeams(data)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">{error}</div>
  }

  return (
    <div className="data-panel">
      <div className="panel-heading">
        <h1>Teams</h1>
        <span className="metric">{teams.length} squads</span>
      </div>
      <div className="grid-list">
        {teams.map((team) => (
          <article className="summary-card" key={team._id ?? team.name}>
            <div>
              <h2>{team.name}</h2>
              <p>{team.mascot}</p>
            </div>
            <dl>
              <div>
                <dt>Coach</dt>
                <dd>{team.coach}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.memberCount}</dd>
              </div>
              <div>
                <dt>Weekly Minutes</dt>
                <dd>{team.weeklyMinutes}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Teams
